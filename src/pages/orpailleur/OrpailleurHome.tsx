import { useAuth } from "@/context/AuthContext";
import { mockLots, mockTransactions, mockPayments, formatAriary, formatDate, lotStatusLabels, lotStatusColors } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function OrpailleurHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const myLots = mockLots.filter((l) => l.currentOwner === user?.id);
  const totalWeight = myLots.reduce((s, l) => s + l.quantity, 0);
  const myTransactions = mockTransactions.filter((t) => t.sellerId === user?.id);
  const blockedLots = myLots.filter((l) => l.status === "blocked");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Bienvenue, {user?.prenom}</h1>
        <p className="text-sm text-muted-foreground mt-1">Votre tableau de bord orpailleur</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Stock total</p>
            <p className="text-3xl font-display font-bold text-foreground mt-1">{totalWeight.toFixed(1)} g</p>
            <p className="text-xs text-muted-foreground mt-1">{myLots.length} lot(s)</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Dernière vente</p>
            <p className="text-3xl font-display font-bold text-foreground mt-1">
              {myTransactions[0] ? formatAriary(myTransactions[0].totalAmount) : "—"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {myTransactions[0] ? formatDate(myTransactions[0].createdAt) : "Aucune vente"}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Alertes</p>
            <p className="text-3xl font-display font-bold text-destructive mt-1">{blockedLots.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Lot(s) bloqué(s)</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => navigate("/dashboard/declare")} className="gradient-gold text-primary-foreground shadow-gold">
          📝 Déclarer un lot
        </Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/lots")}>
          📦 Mes lots
        </Button>
        <Button variant="outline" onClick={() => navigate("/dashboard/sell")}>
          💰 Vendre
        </Button>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Mes lots récents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {myLots.slice(0, 5).map((lot) => (
              <div key={lot.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium">{lot.id}</p>
                  <p className="text-xs text-muted-foreground">{lot.productType} • {lot.quantity} {lot.unit}</p>
                </div>
                <Badge className={lotStatusColors[lot.status]} variant="secondary">
                  {lotStatusLabels[lot.status]}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
