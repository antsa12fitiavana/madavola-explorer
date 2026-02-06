import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function DeclarerLot() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    productType: "",
    quantity: "",
    unit: "g",
    notes: "",
  });

  const handleSubmit = () => {
    if (!form.productType || !form.quantity) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    setSubmitted(true);
    toast.success("Lot déclaré avec succès !");
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <Card className="shadow-elevated border-emerald-brand/20">
          <CardContent className="pt-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-brand/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h2 className="text-xl font-display font-bold">Lot déclaré !</h2>
            <p className="text-sm text-muted-foreground mt-2">ID: LOT-OR-2025-0099</p>

            <div className="mt-6 bg-muted rounded-xl p-6">
              <div className="w-32 h-32 mx-auto bg-foreground/10 rounded-lg flex items-center justify-center mb-3">
                <span className="text-4xl">📱</span>
              </div>
              <p className="text-xs text-muted-foreground">QR Code du lot</p>
            </div>

            <div className="mt-4 text-left space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Type:</span><span>{form.productType}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Quantité:</span><span>{form.quantity} {form.unit}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">GPS:</span><span className="font-mono text-xs">-13.6833, 48.4500</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Statut:</span>
                <span className="text-emerald-brand font-medium">Disponible</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setSubmitted(false)}>
                Nouveau lot
              </Button>
              <Button className="flex-1 gradient-gold text-primary-foreground">
                Vendre ce lot
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-display font-bold">Déclarer une production</h1>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Informations du lot</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">Type de produit</Label>
            <Select value={form.productType} onValueChange={(v) => setForm({ ...form, productType: v })}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Choisir…" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Or brut">Or brut</SelectItem>
                <SelectItem value="Pépites">Pépites</SelectItem>
                <SelectItem value="Concentré">Concentré</SelectItem>
                <SelectItem value="Raffiné">Raffiné</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground">Quantité</Label>
              <Input
                type="number"
                step="0.1"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                placeholder="15.5"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Unité</Label>
              <Select value={form.unit} onValueChange={(v) => setForm({ ...form, unit: v })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="g">Grammes (g)</SelectItem>
                  <SelectItem value="kg">Kilogrammes (kg)</SelectItem>
                  <SelectItem value="akotry">Akotry</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Photos (optionnel)</Label>
            <div className="mt-1 border-2 border-dashed border-border rounded-lg p-4 text-center">
              <Button variant="ghost" size="sm" onClick={() => toast.info("Photo simulée !")}>
                📷 Ajouter photo
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Notes</Label>
            <Textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Zone, observations…"
              className="mt-1"
              rows={2}
            />
          </div>

          <div className="bg-muted rounded-lg p-3">
            <p className="text-xs text-muted-foreground">📍 GPS auto: <span className="font-mono">-13.6833, 48.4500 ±8m</span></p>
          </div>

          <Button onClick={handleSubmit} className="w-full gradient-gold text-primary-foreground shadow-gold font-semibold">
            Soumettre la déclaration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
