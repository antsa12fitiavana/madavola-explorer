import { useState } from "react";
import { mockLots, lotStatusLabels, lotStatusColors, formatDate, demoUsers } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ScannerAcheter() {
  const [scannedLotId, setScannedLotId] = useState("");
  const [scanned, setScanned] = useState(false);
  const [proposalSent, setProposalSent] = useState(false);
  const [amount, setAmount] = useState("");

  const lot = scanned ? mockLots.find((l) => l.id === scannedLotId || l.qrCode === scannedLotId) : null;
  const owner = lot ? demoUsers.find((u) => u.id === lot.declaredBy) : null;

  const handleScan = () => {
    if (!scannedLotId) {
      toast.info("Simulation: utilisation du lot LOT-OR-2025-0001");
      setScannedLotId("LOT-OR-2025-0001");
    }
    setScanned(true);
  };

  const handlePropose = () => {
    if (!amount) { toast.error("Saisissez un montant"); return; }
    toast.success("Proposition d'achat envoyée !");
    setProposalSent(true);
  };

  if (proposalSent) {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="shadow-elevated border-emerald-brand/20">
          <CardContent className="pt-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <span className="text-3xl">⏳</span>
            </div>
            <h2 className="text-xl font-display font-bold">Proposition envoyée</h2>
            <p className="text-sm text-muted-foreground">En attente de confirmation du vendeur</p>
            <p className="text-xs text-muted-foreground">Lot: {lot?.id} • Montant: {amount} Ar</p>
            <Button variant="outline" onClick={() => { setScanned(false); setProposalSent(false); setScannedLotId(""); setAmount(""); }}>
              Scanner un autre lot
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-display font-bold">Scanner / Acheter</h1>

      <Card className="shadow-card">
        <CardContent className="pt-6 space-y-4">
          <div className="bg-muted rounded-xl p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-foreground/5 rounded-lg flex items-center justify-center mb-3">
              <span className="text-4xl">📷</span>
            </div>
            <p className="text-sm text-muted-foreground">Scanner le QR code du lot</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={handleScan}>
              Simuler scan
            </Button>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Ou saisir l'ID du lot…"
              value={scannedLotId}
              onChange={(e) => setScannedLotId(e.target.value)}
            />
            <Button variant="outline" onClick={handleScan}>Chercher</Button>
          </div>
        </CardContent>
      </Card>

      {lot && (
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Résultat</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {lot.status === "blocked" && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm text-destructive">
                ⚠️ Ce lot est bloqué – achat impossible
              </div>
            )}
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div><span className="text-muted-foreground text-xs">Lot</span><p className="font-medium">{lot.id}</p></div>
              <div><span className="text-muted-foreground text-xs">Statut</span><Badge className={lotStatusColors[lot.status]} variant="secondary">{lotStatusLabels[lot.status]}</Badge></div>
              <div><span className="text-muted-foreground text-xs">Propriétaire</span><p className="font-medium">{owner?.prenom} {owner?.nom}</p></div>
              <div><span className="text-muted-foreground text-xs">Produit</span><p>{lot.productType} • {lot.quantity} {lot.unit}</p></div>
              <div><span className="text-muted-foreground text-xs">Déclaré</span><p>{formatDate(lot.declaredAt)}</p></div>
            </div>

            {lot.status === "available" && (
              <div className="border-t pt-4 space-y-3">
                <Input
                  type="number"
                  placeholder="Montant proposé (Ar)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <Button onClick={handlePropose} className="w-full gradient-gold text-primary-foreground shadow-gold">
                  Proposer l'achat
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
