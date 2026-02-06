import { useState } from "react";
import { mockLots, mockInspections, lotStatusLabels, lotStatusColors, formatDate, demoUsers } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export default function ControleurHome() {
  const navigate = useNavigate();
  const todayControls = mockInspections.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Contrôles</h1>
        <p className="text-sm text-muted-foreground">Module contrôle & verbalisation</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-card"><CardContent className="pt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Contrôles effectués</p>
          <p className="text-2xl font-display font-bold mt-1">{todayControls}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="pt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Infractions</p>
          <p className="text-2xl font-display font-bold text-destructive mt-1">
            {mockInspections.filter((i) => i.result === "infraction").length}
          </p>
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="pt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Lots bloqués</p>
          <p className="text-2xl font-display font-bold text-destructive mt-1">
            {mockLots.filter((l) => l.status === "blocked").length}
          </p>
        </CardContent></Card>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => navigate("/dashboard/scan-control")} className="gradient-gold text-primary-foreground shadow-gold">
          🔍 Scanner un lot
        </Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/history")}>📋 Historique</Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/violations")}>⚠️ PV</Button>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Derniers contrôles</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockInspections.map((insp) => {
              const resultColors = { ok: "bg-emerald-brand/10 text-emerald-brand", suspect: "bg-primary/10 text-primary", infraction: "bg-destructive/10 text-destructive" };
              const resultLabels = { ok: "OK", suspect: "Suspect", infraction: "Infraction" };
              return (
                <div key={insp.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">{insp.id}</p>
                    <p className="text-xs text-muted-foreground">Lot: {insp.inspectedLotId} • {formatDate(insp.createdAt)}</p>
                  </div>
                  <Badge className={resultColors[insp.result]} variant="secondary">{resultLabels[insp.result]}</Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
