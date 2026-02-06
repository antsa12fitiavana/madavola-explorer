import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import type { UserRole } from "@/data/mockData";

interface MenuItem {
  label: string;
  icon: string;
  path: string;
}

const menusByRole: Record<UserRole | "com", MenuItem[]> = {
  orpailleur: [
    { label: "Accueil", icon: "🏠", path: "/dashboard" },
    { label: "Déclarer un lot", icon: "📝", path: "/dashboard/declare" },
    { label: "Mes lots", icon: "📦", path: "/dashboard/lots" },
    { label: "Vendre", icon: "💰", path: "/dashboard/sell" },
    { label: "Paiements", icon: "💳", path: "/dashboard/payments" },
    { label: "Factures", icon: "📄", path: "/dashboard/invoices" },
  ],
  collecteur: [
    { label: "Accueil", icon: "🏠", path: "/dashboard" },
    { label: "Scanner / Acheter", icon: "📱", path: "/dashboard/scan-buy" },
    { label: "Mes lots", icon: "📦", path: "/dashboard/lots" },
    { label: "Consolider lots", icon: "🔗", path: "/dashboard/consolidate" },
    { label: "Vendre au comptoir", icon: "🏪", path: "/dashboard/sell" },
    { label: "Transactions", icon: "📊", path: "/dashboard/transactions" },
    { label: "Paiements", icon: "💳", path: "/dashboard/payments" },
  ],
  commune: [
    { label: "Tableau de bord", icon: "📊", path: "/dashboard" },
    { label: "Demandes inscription", icon: "📋", path: "/dashboard/registrations" },
    { label: "Comptes", icon: "👥", path: "/dashboard/accounts" },
    { label: "Paiements communaux", icon: "💰", path: "/dashboard/commune-payments" },
    { label: "Activité locale", icon: "📈", path: "/dashboard/activity" },
    { label: "Paramètres", icon: "⚙️", path: "/dashboard/settings" },
  ],
  controleur: [
    { label: "Accueil", icon: "🏠", path: "/dashboard" },
    { label: "Scanner contrôle", icon: "🔍", path: "/dashboard/scan-control" },
    { label: "Historique contrôles", icon: "📋", path: "/dashboard/history" },
    { label: "PV / Infractions", icon: "⚠️", path: "/dashboard/violations" },
    { label: "Saisies", icon: "🔒", path: "/dashboard/seizures" },
  ],
  comptoir: [
    { label: "Dashboard", icon: "📊", path: "/dashboard" },
    { label: "Achats", icon: "📥", path: "/dashboard/purchases" },
    { label: "Stock lots", icon: "📦", path: "/dashboard/lots" },
    { label: "Consolidation export", icon: "🔗", path: "/dashboard/consolidate" },
    { label: "Dossiers export", icon: "✈️", path: "/dashboard/exports" },
    { label: "Factures", icon: "📄", path: "/dashboard/invoices" },
    { label: "Paiements", icon: "💳", path: "/dashboard/payments" },
  ],
  dirigeant: [
    { label: "Vue nationale", icon: "🗺", path: "/dashboard" },
    { label: "Régions / Districts", icon: "📍", path: "/dashboard/regions" },
    { label: "Recettes", icon: "💰", path: "/dashboard/revenue" },
    { label: "Exportations", icon: "✈️", path: "/dashboard/exports" },
    { label: "Risques & anomalies", icon: "⚠️", path: "/dashboard/risks" },
  ],
  com: [
    { label: "Dashboard COM", icon: "📊", path: "/dashboard" },
    { label: "Acteurs OR", icon: "👥", path: "/dashboard/actors" },
    { label: "Validations", icon: "✅", path: "/dashboard/validations" },
    { label: "Dossiers export", icon: "✈️", path: "/dashboard/exports" },
    { label: "Conformité", icon: "🔒", path: "/dashboard/compliance" },
  ],
};

export default function AppLayout() {
  const { user, logout, filiere } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) {
    navigate("/login");
    return null;
  }

  const menu = menusByRole[user.role] || menusByRole.orpailleur;
  const filiereLabel = filiere === "or" ? "Or" : filiere === "pierre" ? "Pierres" : "Bois";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
            className="w-[260px] bg-sidebar text-sidebar-foreground flex flex-col fixed h-full z-30 lg:relative"
          >
            <div className="p-5 border-b border-sidebar-border">
              <h1 className="text-xl font-display font-bold">
                MADA<span className="text-sidebar-primary">VOLA</span>
              </h1>
              <p className="text-xs text-sidebar-foreground/50 mt-0.5">Filière {filiereLabel}</p>
            </div>

            <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
              {menu.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                      ${isActive
                        ? "bg-sidebar-accent text-sidebar-primary font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                      }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-sidebar-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full gradient-gold flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {user.prenom?.[0] || user.nom[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user.prenom ? `${user.prenom} ${user.nom}` : user.nom}
                  </p>
                  <p className="text-xs text-sidebar-foreground/50 capitalize">{user.role}</p>
                </div>
              </div>
              <button
                onClick={() => { logout(); navigate("/login"); }}
                className="w-full text-left text-xs text-sidebar-foreground/40 hover:text-sidebar-foreground/70 transition-colors"
              >
                ⎋ Déconnexion
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-14 border-b border-border flex items-center px-4 gap-3 bg-card shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-muted-foreground hover:text-foreground lg:hidden"
          >
            ☰
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-muted-foreground hover:text-foreground hidden lg:block"
          >
            {sidebarOpen ? "◁" : "▷"}
          </button>
          <div className="flex-1" />
          <span className="text-xs px-2 py-1 rounded-full bg-emerald-brand/10 text-emerald-brand font-medium">
            ● {user.status === "active" ? "Actif" : user.status}
          </span>
          <span className="text-xs text-muted-foreground">{user.commune}</span>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
