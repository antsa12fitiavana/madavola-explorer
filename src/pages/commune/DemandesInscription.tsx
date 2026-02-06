import { useState } from "react";
import { mockRegistrationRequests, formatDate, type RegistrationRequest } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function DemandesInscription() {
  const [requests, setRequests] = useState(mockRegistrationRequests);
  const [selected, setSelected] = useState<RegistrationRequest | null>(null);
  const [justification, setJustification] = useState("");

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: action } : r));
    setSelected(null);
    setJustification("");
    toast.success(action === "approved" ? "Inscription validée !" : "Inscription refusée.");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Demandes d'inscription</h1>

      <div className="space-y-3">
        {requests.map((req) => (
          <Card key={req.id} className="shadow-card cursor-pointer hover:shadow-elevated transition-shadow" onClick={() => setSelected(req)}>
            <CardContent className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                  {req.prenom[0]}{req.nom[0]}
                </div>
                <div>
                  <p className="text-sm font-medium">{req.prenom} {req.nom}</p>
                  <p className="text-xs text-muted-foreground capitalize">{req.role} • {req.fokontany} • {formatDate(req.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={
                  req.paymentStatus === "paid" ? "bg-emerald-brand/10 text-emerald-brand" :
                  req.paymentStatus === "pending" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                }>
                  {req.paymentStatus === "paid" ? "Payé" : req.paymentStatus === "pending" ? "Non payé" : "Exception"}
                </Badge>
                <Badge variant="secondary" className={
                  req.status === "pending" ? "bg-primary/10 text-primary" :
                  req.status === "approved" ? "bg-emerald-brand/10 text-emerald-brand" : "bg-destructive/10 text-destructive"
                }>
                  {req.status === "pending" ? "En attente" : req.status === "approved" ? "Validé" : "Refusé"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display">Demande: {selected.prenom} {selected.nom}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div><span className="text-muted-foreground text-xs">CIN</span><p className="font-medium">{selected.cin}</p></div>
                <div><span className="text-muted-foreground text-xs">Téléphone</span><p className="font-medium">{selected.telephone}</p></div>
                <div><span className="text-muted-foreground text-xs">Rôle</span><p className="font-medium capitalize">{selected.role}</p></div>
                <div><span className="text-muted-foreground text-xs">Fokontany</span><p className="font-medium">{selected.fokontany}</p></div>
                <div><span className="text-muted-foreground text-xs">GPS</span><p className="font-mono text-xs">{selected.gpsLat}, {selected.gpsLon}</p></div>
                <div><span className="text-muted-foreground text-xs">Paiement 10 000 Ar</span>
                  <Badge variant="secondary" className={
                    selected.paymentStatus === "paid" ? "bg-emerald-brand/10 text-emerald-brand" : "bg-primary/10 text-primary"
                  }>
                    {selected.paymentStatus === "paid" ? "✓ Payé" : "En attente"}
                  </Badge>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">📄 Pièces jointes</p>
                <p className="text-xs">Photo CIN (simulé)</p>
              </div>

              {selected.status === "pending" && (
                <>
                  <Textarea
                    placeholder="Justification (obligatoire pour refus)"
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    rows={2}
                  />
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 text-destructive border-destructive/20 hover:bg-destructive/5"
                      onClick={() => handleAction(selected.id, "rejected")}
                      disabled={!justification}
                    >
                      Refuser
                    </Button>
                    <Button
                      className="flex-1 gradient-gold text-primary-foreground shadow-gold"
                      onClick={() => handleAction(selected.id, "approved")}
                    >
                      Valider
                    </Button>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
