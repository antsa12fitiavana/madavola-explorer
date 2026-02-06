import { useState } from "react";
import { mockLots, lotStatusLabels, lotStatusColors, formatDate, demoUsers, mockTransactions } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ScannerControle() {
  const [lotId, setLotId] = useState("");
  const [scanned, setScanned] = useState(false);
  const [decision, setDecision] = useState<"" | "ok" | "suspect" | "infraction">("");
  const [pvStep, setPvStep] = useState(0);

  const lot = scanned ? mockLots.find((l) => l.id === lotId) : null;
  const owner = lot ? demoUsers.find((u) => u.id === lot.currentOwner) : null;
  const txns = lot ? mockTransactions.filter((t) => t.lots.includes(lot.id)) : [];

  const handleScan = () => {
    if (!lotId) { setLotId("LOT-OR-2025-0001"); }
    setScanned(true);
  };

  const handleDecision = (d: "ok" | "suspect" | "infraction") => {
    setDecision(d);
    if (d === "ok") {
      toast.success("Contrôle OK enregistré !");
    } else if (d === "infraction") {
      setPvStep(1);
    }
  };

  if (decision === "infraction" && pvStep > 0) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <h1 className="text-2xl font-display font-bold">PV numérique</h1>
        <Card className="shadow-card">
          <CardContent className="pt-6 space-y-4">
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 text-sm">
              Lot: {lotId} • Propriétaire: {owner?.prenom} {owner?.nom}
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-1">Motif d'infraction</p>
              <Select defaultValue="DOCS_MANQUANTS">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="DOCS_MANQUANTS">Documents manquants</SelectItem>
                  <SelectItem value="QUANTITE_INCOHERENTE">Quantité incohérente</SelectItem>
                  <SelectItem value="ACTEUR_NON_AUTORISE">Acteur non autorisé</SelectItem>
                  <SelectItem value="ZONE_INTERDITE">Zone interdite</SelectItem>
                  <SelectItem value="AUTRE">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea placeholder="Description…" rows={2} />

            <div>
              <p className="text-xs text-muted-foreground mb-2">Mesures</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked /> Bloquer le lot
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" /> Amende
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" /> Saisie
                </label>
              </div>
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
              <Button variant="ghost" size="sm" onClick={() => toast.info("Photo simulée")}>📷 Ajouter preuves</Button>
            </div>

            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground">📍 GPS: <span className="font-mono">-13.6833, 48.4500</span></p>
            </div>

            <Button
              className="w-full gradient-gold text-primary-foreground shadow-gold"
              onClick={() => { toast.success("PV enregistré ! PV-2025-0099"); setDecision(""); setPvStep(0); setScanned(false); setLotId(""); }}
            >
              Enregistrer le PV
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-display font-bold">Scanner contrôle</h1>

      <Card className="shadow-card">
        <CardContent className="pt-6 space-y-4">
          <div className="bg-muted rounded-xl p-8 text-center">
            <span className="text-4xl block mb-2">🔍</span>
            <p className="text-sm text-muted-foreground">Scanner le QR du lot ou de la facture</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={handleScan}>Simuler scan</Button>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Ou saisir l'ID…" value={lotId} onChange={(e) => setLotId(e.target.value)} />
            <Button variant="outline" onClick={handleScan}>Vérifier</Button>
          </div>
        </CardContent>
      </Card>

      {lot && (
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Résumé conformité</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Lot valide ?</p>
                <p className={lot.status !== "blocked" ? "text-emerald-brand font-medium" : "text-destructive font-medium"}>
                  {lot.status !== "blocked" ? "✓ Oui" : "✗ Bloqué"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Propriétaire</p>
                <p className="font-medium">{owner?.prenom} {owner?.nom}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Paiement OK ?</p>
                <p className="text-emerald-brand font-medium">✓ Oui</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Facture OK ?</p>
                <p className="text-emerald-brand font-medium">✓ Oui ({txns.length} txn)</p>
              </div>
              <div><p className="text-xs text-muted-foreground">Produit</p><p>{lot.productType} • {lot.quantity} {lot.unit}</p></div>
              <div>
                <p className="text-xs text-muted-foreground">Statut</p>
                <Badge className={lotStatusColors[lot.status]} variant="secondary">{lotStatusLabels[lot.status]}</Badge>
              </div>
            </div>

            {!decision && (
              <div className="flex gap-3 pt-2">
                <Button className="flex-1 bg-emerald-brand text-accent-foreground hover:bg-emerald-light" onClick={() => handleDecision("ok")}>
                  ✓ OK
                </Button>
                <Button variant="outline" className="flex-1 text-primary border-primary/30" onClick={() => handleDecision("suspect")}>
                  ⚠ Suspect
                </Button>
                <Button variant="outline" className="flex-1 text-destructive border-destructive/30" onClick={() => handleDecision("infraction")}>
                  ✗ Infraction
                </Button>
              </div>
            )}

            {decision === "ok" && (
              <div className="bg-emerald-brand/10 rounded-lg p-3 text-center text-sm text-emerald-brand font-medium">
                ✓ Contrôle OK enregistré
              </div>
            )}
            {decision === "suspect" && (
              <div className="space-y-3">
                <Textarea placeholder="Motif de suspicion…" rows={2} />
                <Button variant="outline" className="w-full" onClick={() => { toast.success("Contrôle suspect enregistré"); setDecision(""); setScanned(false); }}>
                  Enregistrer
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
