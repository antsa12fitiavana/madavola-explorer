import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { mockLots, demoUsers, formatAriary } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function VendreLot() {
  const { user } = useAuth();
  const [step, setStep] = useState<"select" | "confirm" | "done">("select");
  const [selectedLotId, setSelectedLotId] = useState("");
  const [buyerId, setBuyerId] = useState("");
  const [price, setPrice] = useState("");

  const availableLots = mockLots.filter((l) => l.currentOwner === user?.id && l.status === "available");
  const selectedLot = mockLots.find((l) => l.id === selectedLotId);
  const buyers = user?.role === "orpailleur"
    ? demoUsers.filter((u) => u.role === "collecteur")
    : demoUsers.filter((u) => u.role === "comptoir");
  const buyer = demoUsers.find((u) => u.id === buyerId);

  const handleConfirm = () => {
    toast.success("Paiement confirmé ! Transfert de propriété effectué.");
    setStep("done");
  };

  if (step === "done") {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="shadow-elevated border-emerald-brand/20">
          <CardContent className="pt-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-brand/10 flex items-center justify-center mx-auto">
              <span className="text-3xl">✓</span>
            </div>
            <h2 className="text-xl font-display font-bold">Transfert effectué !</h2>
            <p className="text-sm text-muted-foreground">
              Lot {selectedLotId} transféré à {buyer?.prenom} {buyer?.nom}
            </p>
            <p className="text-lg font-bold text-primary">{formatAriary(Number(price))}</p>
            <p className="text-xs text-muted-foreground">Facture numérique générée • Réf: FAC-2025-0099</p>
            <Button variant="outline" onClick={() => { setStep("select"); setSelectedLotId(""); setPrice(""); }}>
              Nouvelle vente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <h1 className="text-2xl font-display font-bold">Confirmer la vente</h1>
        <Card className="shadow-card">
          <CardContent className="pt-6 space-y-4">
            <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Lot:</span><span className="font-medium">{selectedLotId}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Produit:</span><span>{selectedLot?.productType} • {selectedLot?.quantity} {selectedLot?.unit}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Acheteur:</span><span>{buyer?.prenom} {buyer?.nom}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Montant:</span><span className="font-bold text-primary">{formatAriary(Number(price))}</span></div>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">💳 Paiement via Mobile Money (mVola)</p>
              <p className="text-xs text-muted-foreground mt-1">Statut: <span className="text-primary font-medium">En attente de confirmation…</span></p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep("select")}>Annuler</Button>
              <Button className="flex-1 gradient-gold text-primary-foreground shadow-gold" onClick={handleConfirm}>
                Confirmer le paiement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-display font-bold">
        {user?.role === "orpailleur" ? "Vendre un lot" : "Vendre au comptoir"}
      </h1>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Détails de la vente</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">Sélectionner un lot</Label>
            <Select value={selectedLotId} onValueChange={setSelectedLotId}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Choisir un lot…" /></SelectTrigger>
              <SelectContent>
                {availableLots.map((l) => (
                  <SelectItem key={l.id} value={l.id}>
                    {l.id} — {l.productType} • {l.quantity} {l.unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Acheteur</Label>
            <Select value={buyerId} onValueChange={setBuyerId}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Choisir…" /></SelectTrigger>
              <SelectContent>
                {buyers.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.prenom} {b.nom} ({b.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Prix (Ariary)</Label>
            <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="1 500 000" className="mt-1" />
          </div>

          <Button
            onClick={() => setStep("confirm")}
            disabled={!selectedLotId || !buyerId || !price}
            className="w-full gradient-gold text-primary-foreground shadow-gold font-semibold"
          >
            Poursuivre
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
