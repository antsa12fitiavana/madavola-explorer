import { useAuth } from "@/context/AuthContext";
import { mockLots, mockTransactions, mockExportDossiers, formatAriary, formatDate, lotStatusLabels, lotStatusColors } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ComptoirHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const myLots = mockLots.filter((l) => l.currentOwner === user?.id);
  const totalWeight = myLots.reduce((s, l) => s + l.quantity, 0);
  const exports = mockExportDossiers.filter((e) => e.comptoirId === user?.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">{user?.nom}</h1>
        <p className="text-sm text-muted-foreground">Dashboard comptoir</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="shadow-card"><CardContent className="pt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Stock total</p>
          <p className="text-2xl font-display font-bold mt-1">{totalWeight.toFixed(1)} g</p>
          <p className="text-xs text-muted-foreground">{myLots.length} lot(s)</p>
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="pt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Achats (mois)</p>
          <p className="text-2xl font-display font-bold mt-1">{formatAriary(12000000)}</p>
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="pt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Dossiers export</p>
          <p className="text-2xl font-display font-bold mt-1">{exports.length}</p>
          <p className="text-xs text-muted-foreground">{exports.filter((e) => e.status !== "draft").length} en cours</p>
        </CardContent></Card>
        <Card className="shadow-card"><CardContent className="pt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Anomalies</p>
          <p className="text-2xl font-display font-bold text-destructive mt-1">0</p>
        </CardContent></Card>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Button onClick={() => navigate("/dashboard/purchases")} className="gradient-gold text-primary-foreground shadow-gold">📥 Achats</Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/lots")}>📦 Stock</Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/exports")}>✈️ Exports</Button>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Dossiers export</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {exports.map((exp) => {
              const statusLabels: Record<string, string> = {
                draft: "Brouillon", ready_control: "Prêt contrôle", controlled: "Contrôlé",
                sealed: "Scellé", declared_customs: "Déclaré douanes", exported: "Exporté", closed: "Clos"
              };
              return (
                <div key={exp.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">{exp.id}</p>
                    <p className="text-xs text-muted-foreground">{exp.destination} • {exp.totalWeight}g • {formatAriary(exp.declaredValue)}</p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">{statusLabels[exp.status]}</Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
