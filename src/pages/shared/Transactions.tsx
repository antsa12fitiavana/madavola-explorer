import { mockTransactions, formatAriary, formatDate, demoUsers } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const txnStatusLabels: Record<string, string> = {
  paid: "Payé",
  pending_payment: "En attente",
  cancelled: "Annulé",
  failed: "Échoué",
  draft: "Brouillon",
};
const txnStatusColors: Record<string, string> = {
  paid: "bg-emerald-brand/10 text-emerald-brand",
  pending_payment: "bg-primary/10 text-primary",
  cancelled: "bg-muted text-muted-foreground",
  failed: "bg-destructive/10 text-destructive",
  draft: "bg-muted text-muted-foreground",
};

export default function Transactions() {
  const { user } = useAuth();
  const transactions = mockTransactions.filter((t) => t.sellerId === user?.id || t.buyerId === user?.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Transactions</h1>
      <div className="space-y-3">
        {transactions.map((t) => {
          const isSeller = t.sellerId === user?.id;
          const other = demoUsers.find((u) => u.id === (isSeller ? t.buyerId : t.sellerId));
          return (
            <Card key={t.id} className="shadow-card">
              <CardContent className="py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {isSeller ? "Vendu à" : "Acheté de"} {other ? `${other.prenom} ${other.nom}` : "—"} • {t.lots.join(", ")}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatDate(t.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{formatAriary(t.totalAmount)}</p>
                  <Badge className={txnStatusColors[t.status]} variant="secondary">
                    {txnStatusLabels[t.status]}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
