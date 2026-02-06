import { useState } from "react";
import { mockRegistrationRequests, formatDate, formatAriary } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CommuneHome() {
  const navigate = useNavigate();
  const pendingCount = mockRegistrationRequests.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Commune d'Ambanja</h1>
        <p className="text-sm text-muted-foreground">Tableau de bord communal</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="shadow-card"><CardContent className="pt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Inscriptions (mois)</p>
          <p className="text-2xl font-display font-bold mt-1">12</p>
          <p className="text-xs text-emerald-brand">+3 cette semaine</p>
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="pt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Recettes (10 000 Ar)</p>
          <p className="text-2xl font-display font-bold mt-1">{formatAriary(120000)}</p>
          <p className="text-xs text-muted-foreground">12 paiements</p>
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="pt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Lots déclarés</p>
          <p className="text-2xl font-display font-bold mt-1">45</p>
          <p className="text-xs text-muted-foreground">350.2 g total</p>
        </CardContent></Card>
        <Card className="shadow-card border-primary/20"><CardContent className="pt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">En attente</p>
          <p className="text-2xl font-display font-bold text-primary mt-1">{pendingCount}</p>
          <p className="text-xs text-primary">Demandes à traiter</p>
        </CardContent></Card>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => navigate("/dashboard/registrations")} className="gradient-gold text-primary-foreground shadow-gold">
          📋 Demandes ({pendingCount})
        </Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/commune-payments")}>💰 Paiements</Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/accounts")}>👥 Comptes</Button>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Alertes</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
              <span>📋</span>
              <p className="text-sm">{pendingCount} demande(s) d'inscription en attente de validation</p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/10">
              <span>⚠️</span>
              <p className="text-sm">1 lot bloqué suite à contrôle dans la commune</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
