import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAriary } from "@/data/mockData";

export default function DirigeantHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold">Vue nationale</h1>
        <p className="text-sm text-muted-foreground">Indicateurs macro – Filière Or</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card border-l-4 border-l-primary">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Production déclarée</p>
            <p className="text-2xl font-display font-bold mt-1">1 245 g</p>
            <p className="text-xs text-emerald-brand">↑ +12% vs mois précédent</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-l-4 border-l-emerald-brand">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Recettes communes</p>
            <p className="text-2xl font-display font-bold mt-1">{formatAriary(2450000)}</p>
            <p className="text-xs text-muted-foreground">245 inscriptions</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-l-4 border-l-sapphire">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Volume exporté</p>
            <p className="text-2xl font-display font-bold mt-1">520 g</p>
            <p className="text-xs text-muted-foreground">4 dossiers</p>
          </CardContent>
        </Card>
        <Card className="shadow-card border-l-4 border-l-destructive">
          <CardContent className="pt-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Anomalies / PV</p>
            <p className="text-2xl font-display font-bold text-destructive mt-1">3</p>
            <p className="text-xs text-muted-foreground">2 lots bloqués, 1 saisie</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Top régions (activité)</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { region: "Diana", lots: 45, weight: "350.2g" },
                { region: "Analamanga", lots: 32, weight: "280.0g" },
                { region: "Alaotra-Mangoro", lots: 28, weight: "210.5g" },
                { region: "Vakinankaratra", lots: 15, weight: "120.0g" },
                { region: "Sava", lots: 12, weight: "95.3g" },
              ].map((r, i) => (
                <div key={r.region} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{r.region}</span>
                      <span className="text-muted-foreground">{r.lots} lots • {r.weight}</span>
                    </div>
                    <div className="mt-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full gradient-gold rounded-full" style={{ width: `${(r.lots / 45) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader><CardTitle className="text-base">Adoption</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-display font-bold">245</p>
                <p className="text-xs text-muted-foreground">Comptes actifs</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-display font-bold">18</p>
                <p className="text-xs text-muted-foreground">Communes actives</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-display font-bold">8</p>
                <p className="text-xs text-muted-foreground">Collecteurs</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-display font-bold">3</p>
                <p className="text-xs text-muted-foreground">Comptoirs agréés</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-base">Flux: Production → Vente → Export</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-4">
            {[
              { label: "Déclaré", value: "1 245g", color: "gradient-gold" },
              { label: "→ Vendu collecteurs", value: "980g", color: "gradient-gold" },
              { label: "→ Vendu comptoirs", value: "720g", color: "gradient-emerald" },
              { label: "→ Exporté", value: "520g", color: "gradient-sapphire" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 flex-1">
                <div className={`${step.color} rounded-lg px-3 py-2 text-center flex-1`}>
                  <p className="text-xs text-primary-foreground/80">{step.label}</p>
                  <p className="text-sm font-bold text-primary-foreground">{step.value}</p>
                </div>
                {i < 3 && <span className="text-muted-foreground shrink-0">→</span>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
