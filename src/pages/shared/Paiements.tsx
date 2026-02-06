import { mockPayments, mockTransactions, formatAriary, formatDate, demoUsers } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
  success: "bg-emerald-brand/10 text-emerald-brand",
  pending: "bg-primary/10 text-primary",
  failed: "bg-destructive/10 text-destructive",
  reversed: "bg-muted text-muted-foreground",
};

export default function Paiements() {
  const { user } = useAuth();
  const payments = mockPayments.filter((p) => p.payerActorId === user?.id || p.payeeActorId === user?.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Paiements</h1>

      <div className="space-y-3">
        {payments.map((p) => {
          const isIncoming = p.payeeActorId === user?.id;
          const other = demoUsers.find((u) => u.id === (isIncoming ? p.payerActorId : p.payeeActorId));
          return (
            <Card key={p.id} className="shadow-card">
              <CardContent className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${isIncoming ? "bg-emerald-brand/10" : "bg-destructive/10"}`}>
                    {isIncoming ? "↓" : "↑"}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {isIncoming ? "Reçu de" : "Payé à"} {other ? `${other.prenom} ${other.nom}` : p.payeeActorId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {p.channel === "mobile_money" ? `Mobile Money (${p.operator})` : p.channel} • {p.externalRef}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDate(p.initiatedAt)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${isIncoming ? "text-emerald-brand" : "text-foreground"}`}>
                    {isIncoming ? "+" : "-"}{formatAriary(p.amount)}
                  </p>
                  <Badge className={statusColors[p.status]} variant="secondary">
                    {p.status === "success" ? "Réussi" : p.status === "pending" ? "En attente" : "Échoué"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {payments.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">Aucun paiement</div>
        )}
      </div>
    </div>
  );
}
