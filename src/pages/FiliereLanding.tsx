import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { Filiere } from "@/data/mockData";

const filieres: { id: Filiere; label: string; icon: string; description: string; gradient: string; }[] = [
  {
    id: "or",
    label: "Or",
    icon: "✦",
    description: "Orpailleurs, collecteurs, comptoirs, exportation",
    gradient: "gradient-gold",
  },
  {
    id: "pierre",
    label: "Pierres",
    icon: "◆",
    description: "Saphirs, rubis, tourmalines, pierres industrielles",
    gradient: "gradient-sapphire",
  },
  {
    id: "bois",
    label: "Bois",
    icon: "⬡",
    description: "Ébène, palissandre, bois de rose, bois décoratifs",
    gradient: "gradient-timber",
  },
];

export default function FiliereLanding() {
  const navigate = useNavigate();
  const { setFiliere } = useAuth();

  const handleSelect = (f: Filiere) => {
    setFiliere(f);
    navigate("/login");
  };

  return (
    <div className="min-h-screen gradient-dark flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6">
          <span className="text-primary text-sm font-medium tracking-wide">Plateforme nationale</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-primary-foreground mb-4 tracking-tight">
          MADA<span className="text-primary">VOLA</span>
        </h1>
        <p className="text-lg text-primary-foreground/60 max-w-xl mx-auto leading-relaxed">
          Traçabilité et sécurisation des ressources naturelles de Madagascar
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-primary-foreground/40 text-sm font-medium uppercase tracking-widest mb-8 relative z-10"
      >
        Sélectionnez votre filière
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full relative z-10">
        {filieres.map((f, i) => (
          <motion.button
            key={f.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(f.id)}
            className={`${f.gradient} rounded-2xl p-8 text-left cursor-pointer shadow-elevated group transition-shadow hover:shadow-gold`}
          >
            <span className="text-4xl mb-4 block opacity-90">{f.icon}</span>
            <h2 className="text-2xl font-display font-bold text-primary-foreground mb-2">
              {f.label}
            </h2>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              {f.description}
            </p>
            <div className="mt-6 flex items-center gap-2 text-primary-foreground/80 text-sm font-medium group-hover:translate-x-1 transition-transform">
              Accéder
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="inline">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-16 text-primary-foreground/30 text-xs text-center relative z-10"
      >
        République de Madagascar – Ministère des Mines et des Ressources Stratégiques
      </motion.p>
    </div>
  );
}
