import { Routes, Route } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// Orpailleur
import OrpailleurHome from "./orpailleur/OrpailleurHome";
import DeclarerLot from "./orpailleur/DeclarerLot";

// Collecteur
import CollecteurHome from "./collecteur/CollecteurHome";
import ScannerAcheter from "./collecteur/ScannerAcheter";
import ConsoliderLots from "./collecteur/ConsoliderLots";

// Commune
import CommuneHome from "./commune/CommuneHome";
import DemandesInscription from "./commune/DemandesInscription";
import ComptesCommunaux from "./commune/ComptesCommunaux";

// Controleur
import ControleurHome from "./controleur/ControleurHome";
import ScannerControle from "./controleur/ScannerControle";

// Comptoir
import ComptoirHome from "./comptoir/ComptoirHome";
import DossiersExport from "./comptoir/DossiersExport";

// Dirigeant
import DirigeantHome from "./dirigeant/DirigeantHome";

// Shared
import MesLots from "./shared/MesLots";
import VendreLot from "./shared/VendreLot";
import Paiements from "./shared/Paiements";
import Transactions from "./shared/Transactions";

const Placeholder = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center py-20">
    <p className="text-muted-foreground text-sm">{title} — à implémenter</p>
  </div>
);

export default function DashboardRouter() {
  const { user } = useAuth();
  if (!user) return null;

  const role = user.role;

  return (
    <Routes>
      {/* Home per role */}
      <Route index element={
        role === "orpailleur" ? <OrpailleurHome /> :
        role === "collecteur" ? <CollecteurHome /> :
        role === "commune" ? <CommuneHome /> :
        role === "controleur" ? <ControleurHome /> :
        role === "comptoir" ? <ComptoirHome /> :
        role === "dirigeant" || role === "com" ? <DirigeantHome /> :
        <OrpailleurHome />
      } />

      {/* Shared */}
      <Route path="lots" element={<MesLots />} />
      <Route path="sell" element={<VendreLot />} />
      <Route path="payments" element={<Paiements />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="invoices" element={<Placeholder title="Factures" />} />

      {/* Orpailleur */}
      <Route path="declare" element={<DeclarerLot />} />

      {/* Collecteur */}
      <Route path="scan-buy" element={<ScannerAcheter />} />
      <Route path="consolidate" element={<ConsoliderLots />} />

      {/* Commune */}
      <Route path="registrations" element={<DemandesInscription />} />
      <Route path="accounts" element={<ComptesCommunaux />} />
      <Route path="commune-payments" element={<Paiements />} />
      <Route path="activity" element={<Placeholder title="Activité locale" />} />
      <Route path="settings" element={<Placeholder title="Paramètres commune" />} />

      {/* Controleur */}
      <Route path="scan-control" element={<ScannerControle />} />
      <Route path="history" element={<Placeholder title="Historique contrôles" />} />
      <Route path="violations" element={<Placeholder title="PV / Infractions" />} />
      <Route path="seizures" element={<Placeholder title="Saisies" />} />

      {/* Comptoir */}
      <Route path="purchases" element={<ScannerAcheter />} />
      <Route path="exports" element={<DossiersExport />} />

      {/* Dirigeant */}
      <Route path="regions" element={<Placeholder title="Régions / Districts" />} />
      <Route path="revenue" element={<Placeholder title="Recettes" />} />
      <Route path="risks" element={<Placeholder title="Risques & anomalies" />} />

      {/* COM */}
      <Route path="actors" element={<ComptesCommunaux />} />
      <Route path="validations" element={<DemandesInscription />} />
      <Route path="compliance" element={<Placeholder title="Conformité" />} />

      <Route path="*" element={<Placeholder title="Page non trouvée" />} />
    </Routes>
  );
}
