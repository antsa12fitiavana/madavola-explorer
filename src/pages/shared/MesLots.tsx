import { useAuth } from "@/context/AuthContext";
import { mockLots, lotStatusLabels, lotStatusColors, formatDate } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function MesLots() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedLot, setSelectedLot] = useState<string | null>(null);

  // For orpailleur: lots they own. For collecteur/comptoir: lots they own.
  const lots = mockLots.filter((l) => {
    const ownerMatch = l.currentOwner === user?.id;
    const statusMatch = statusFilter === "all" || l.status === statusFilter;
    const searchMatch = !search || l.id.toLowerCase().includes(search.toLowerCase()) || l.productType.toLowerCase().includes(search.toLowerCase());
    return ownerMatch && statusMatch && searchMatch;
  });

  const detail = selectedLot ? mockLots.find((l) => l.id === selectedLot) : null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold">Mes lots</h1>

      <div className="flex gap-3 flex-wrap">
        <Input
          placeholder="Rechercher lot…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous statuts</SelectItem>
            <SelectItem value="available">Disponible</SelectItem>
            <SelectItem value="blocked">Bloqué</SelectItem>
            <SelectItem value="export_ready">Prêt export</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {lots.map((lot) => (
          <Card key={lot.id} className="shadow-card cursor-pointer hover:shadow-elevated transition-shadow" onClick={() => setSelectedLot(lot.id)}>
            <CardContent className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg">📦</div>
                <div>
                  <p className="text-sm font-medium">{lot.id}</p>
                  <p className="text-xs text-muted-foreground">{lot.productType} • {lot.quantity} {lot.unit} • {formatDate(lot.declaredAt)}</p>
                </div>
              </div>
              <Badge className={lotStatusColors[lot.status]} variant="secondary">
                {lotStatusLabels[lot.status]}
              </Badge>
            </CardContent>
          </Card>
        ))}
        {lots.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            Aucun lot trouvé
          </div>
        )}
      </div>

      {/* Lot Detail Dialog */}
      <Dialog open={!!detail} onOpenChange={() => setSelectedLot(null)}>
        {detail && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display">{detail.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-muted rounded-xl p-6 text-center">
                <div className="w-24 h-24 mx-auto bg-foreground/10 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-3xl">📱</span>
                </div>
                <p className="text-xs text-muted-foreground">QR: {detail.qrCode}</p>
              </div>

              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div><span className="text-muted-foreground text-xs">Type</span><p className="font-medium">{detail.productType}</p></div>
                <div><span className="text-muted-foreground text-xs">Quantité</span><p className="font-medium">{detail.quantity} {detail.unit}</p></div>
                <div><span className="text-muted-foreground text-xs">Déclaré le</span><p className="font-medium">{formatDate(detail.declaredAt)}</p></div>
                <div><span className="text-muted-foreground text-xs">Statut</span><Badge className={lotStatusColors[detail.status]} variant="secondary">{lotStatusLabels[detail.status]}</Badge></div>
                <div className="col-span-2"><span className="text-muted-foreground text-xs">GPS</span><p className="font-mono text-xs">{detail.gpsLat}, {detail.gpsLon}</p></div>
                {detail.notes && <div className="col-span-2"><span className="text-muted-foreground text-xs">Notes</span><p>{detail.notes}</p></div>}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 gradient-gold text-primary-foreground" disabled={detail.status !== "available"}>
                  Vendre
                </Button>
                <Button variant="outline" className="flex-1">
                  Historique
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
