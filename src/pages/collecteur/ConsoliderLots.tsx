import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { mockLots } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function ConsoliderLots() {
  const { user } = useAuth();
  const [selected, setSelected] = useState<string[]>([]);
  const [consolidated, setConsolidated] = useState(false);

  const lots = mockLots.filter((l) => l.currentOwner === user?.id && l.status === "available");

  const toggle = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const totalQty = lots.filter((l) => selected.includes(l.id)).reduce((s, l) => s + l.quantity, 0);

  const handleConsolidate = () => {
    if (selected.length < 2) { toast.error("Sélectionnez au moins 2 lots"); return; }
    toast.success("Lot consolidé créé ! LOT-OR-2025-CONS-99");
    setConsolidated(true);
  };

  if (consolidated) {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="shadow-elevated border-emerald-brand/20">
          <CardContent className="pt-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-brand/10 flex items-center justify-center mx-auto">
              <span className="text-3xl">🔗</span>
            </div>
            <h2 className="text-xl font-display font-bold">Lot consolidé</h2>
            <p className="text-sm text-muted-foreground">ID: LOT-OR-2025-CONS-99</p>
            <p className="text-lg font-bold">{totalQty.toFixed(1)} g</p>
            <p className="text-xs text-muted-foreground">{selected.length} lots parents</p>
            <Button variant="outline" onClick={() => { setConsolidated(false); setSelected([]); }}>OK</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-display font-bold">Consolider des lots</h1>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Sélectionner les lots à consolider</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {lots.map((lot) => (
            <label key={lot.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors
              ${selected.includes(lot.id) ? "border-primary bg-primary/5" : "border-border"}`}>
              <Checkbox checked={selected.includes(lot.id)} onCheckedChange={() => toggle(lot.id)} />
              <div className="flex-1">
                <p className="text-sm font-medium">{lot.id}</p>
                <p className="text-xs text-muted-foreground">{lot.productType} • {lot.quantity} {lot.unit}</p>
              </div>
            </label>
          ))}
          {lots.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Aucun lot disponible</p>}
        </CardContent>
      </Card>

      {selected.length > 0 && (
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex justify-between text-sm mb-4">
              <span className="text-muted-foreground">Lots sélectionnés:</span>
              <span className="font-bold">{selected.length}</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-muted-foreground">Quantité totale:</span>
              <span className="font-bold">{totalQty.toFixed(1)} g</span>
            </div>
            <Button onClick={handleConsolidate} className="w-full gradient-gold text-primary-foreground shadow-gold">
              Créer lot consolidé
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
