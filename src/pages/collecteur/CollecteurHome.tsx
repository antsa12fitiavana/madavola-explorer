import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { mockLots, demoUsers, formatAriary } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CollecteurHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const myLots = mockLots.filter((l) => l.currentOwner === user?.id);
  const totalWeight = myLots.reduce((s, l) => s + l.quantity, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Bienvenue, {user?.prenom}</h1>
        <p className="text-sm text-muted-foreground">Tableau de bord collecteur</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="shadow-card"><CardContent className="pt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Stock total</p>
          <p className="text-2xl font-display font-bold mt-1">{totalWeight.toFixed(1)} g</p>
          <p className="text-xs text-muted-foreground">{myLots.length} lot(s)</p>
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="pt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Achats du jour</p>
          <p className="text-2xl font-display font-bold mt-1">2</p>
          <p className="text-xs text-muted-foreground">{formatAriary(4700000)}</p>
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="pt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Ventes comptoir</p>
          <p className="text-2xl font-display font-bold mt-1">1</p>
          <p className="text-xs text-emerald-brand font-medium">Confirmé</p>
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="pt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Alertes</p>
          <p className="text-2xl font-display font-bold text-destructive mt-1">0</p>
          <p className="text-xs text-muted-foreground">Lot(s) suspect/bloqué</p>
        </CardContent></Card>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => navigate("/dashboard/scan-buy")} className="gradient-gold text-primary-foreground shadow-gold">📱 Scanner / Acheter</Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/lots")}>📦 Stock</Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/sell")}>🏪 Vendre</Button>
      </div>
    </div>
  );
}
