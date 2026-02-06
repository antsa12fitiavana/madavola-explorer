import { demoUsers, formatAriary } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ComptesCommunaux() {
  const accounts = demoUsers.filter((u) => ["orpailleur", "collecteur"].includes(u.role) && u.commune === "Ambanja");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Comptes locaux</h1>
      <div className="space-y-3">
        {accounts.map((u) => (
          <Card key={u.id} className="shadow-card">
            <CardContent className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {u.prenom[0]}
                </div>
                <div>
                  <p className="text-sm font-medium">{u.prenom} {u.nom}</p>
                  <p className="text-xs text-muted-foreground capitalize">{u.role} • {u.telephone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-emerald-brand/10 text-emerald-brand">Actif</Badge>
                <Button variant="ghost" size="sm" onClick={() => toast.info("Action: suspendre/voir activité")}>
                  ⋯
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
