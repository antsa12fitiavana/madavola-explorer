import { useState } from "react";
import { mockExportDossiers, mockLots, formatAriary, formatDate } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const statusLabels: Record<string, string> = {
  draft: "Brouillon", ready_control: "Prêt contrôle", controlled: "Contrôlé",
  sealed: "Scellé", declared_customs: "Déclaré douanes", exported: "Exporté", closed: "Clos"
};
const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground", ready_control: "bg-primary/10 text-primary",
  controlled: "bg-sapphire/10 text-sapphire", sealed: "bg-emerald-brand/10 text-emerald-brand",
  declared_customs: "bg-primary/10 text-primary", exported: "bg-emerald-brand/10 text-emerald-brand",
  closed: "bg-muted text-muted-foreground",
};

export default function DossiersExport() {
  const [selected, setSelected] = useState<string | null>(null);
  const dossier = selected ? mockExportDossiers.find((d) => d.id === selected) : null;
  const lots = dossier ? mockLots.filter((l) => dossier.lots.includes(l.id)) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Dossiers export</h1>
        <Button className="gradient-gold text-primary-foreground shadow-gold" onClick={() => toast.info("Nouveau dossier créé (simulation)")}>
          + Nouveau dossier
        </Button>
      </div>

      <div className="space-y-3">
        {mockExportDossiers.map((exp) => (
          <Card key={exp.id} className="shadow-card cursor-pointer hover:shadow-elevated transition-shadow" onClick={() => setSelected(exp.id)}>
            <CardContent className="py-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{exp.id}</p>
                <p className="text-xs text-muted-foreground">{exp.destination} • {exp.totalWeight}g • {formatAriary(exp.declaredValue)}</p>
                <p className="text-xs text-muted-foreground">{formatDate(exp.createdAt)}</p>
              </div>
              <Badge className={statusColors[exp.status]} variant="secondary">{statusLabels[exp.status]}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!dossier} onOpenChange={() => setSelected(null)}>
        {dossier && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display">{dossier.id}</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="lots">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="lots">Lots</TabsTrigger>
                <TabsTrigger value="docs">Documents</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
              <TabsContent value="lots" className="space-y-3 mt-4">
                {lots.length > 0 ? lots.map((l) => (
                  <div key={l.id} className="flex justify-between p-3 bg-muted/50 rounded-lg text-sm">
                    <span>{l.id} — {l.productType}</span>
                    <span className="font-medium">{l.quantity} {l.unit}</span>
                  </div>
                )) : <p className="text-sm text-muted-foreground text-center py-4">Aucun lot ajouté</p>}
              </TabsContent>
              <TabsContent value="docs" className="mt-4">
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">📄 Inventaire PDF (auto-généré)</p>
                  <p className="text-muted-foreground">📄 Factures consolidées</p>
                  <p className="text-muted-foreground">📄 Certificats traçabilité</p>
                </div>
              </TabsContent>
              <TabsContent value="timeline" className="mt-4">
                <div className="space-y-3">
                  <div className="flex gap-3 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div><p className="font-medium">Dossier créé</p><p className="text-xs text-muted-foreground">{formatDate(dossier.createdAt)}</p></div>
                  </div>
                  {dossier.status !== "draft" && (
                    <div className="flex gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-emerald-brand mt-1.5 shrink-0" />
                      <div><p className="font-medium">Soumis au contrôle</p><p className="text-xs text-muted-foreground">En attente</p></div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            <Button className="w-full gradient-gold text-primary-foreground mt-4" onClick={() => toast.success("Dossier soumis au contrôle !")}>
              Soumettre au contrôle
            </Button>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
