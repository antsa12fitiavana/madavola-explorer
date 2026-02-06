import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { territories, getDistrictsByRegion, getCommunesByDistrict, getFokontanyByCommune } from "@/data/territories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const steps = ["Identité", "Territoire & GPS", "Rôle", "Paiement"];

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    type: "physique" as "physique" | "morale",
    nom: "", prenom: "", cin: "", telephone: "",
    raisonSociale: "", nif: "", stat: "", representant: "",
    regionId: "", districtId: "", communeId: "", fokontanyId: "",
    gpsLat: -13.6833, gpsLon: 48.4500, gpsAccuracy: 8,
    role: "orpailleur",
    paymentMethod: "mobile_money",
  });

  const districts = form.regionId ? getDistrictsByRegion(form.regionId) : [];
  const communes = form.districtId ? getCommunesByDistrict(form.districtId) : [];
  const fokontany = form.communeId ? getFokontanyByCommune(form.communeId) : [];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      toast.success("Inscription réussie ! Compte en attente de validation.");
      login("U001");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen gradient-dark flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-6">
          <button onClick={() => navigate("/login")} className="text-primary-foreground/40 text-sm hover:text-primary-foreground/60 mb-2 inline-block">
            ← Retour connexion
          </button>
          <h1 className="text-2xl font-display font-bold text-primary-foreground">
            Créer un compte
          </h1>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-6 px-4">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                ${i <= step ? "gradient-gold text-primary-foreground shadow-gold" : "bg-primary-foreground/10 text-primary-foreground/40"}`}>
                {i + 1}
              </div>
              {i < 3 && <div className={`flex-1 h-0.5 ${i < step ? "bg-primary" : "bg-primary-foreground/10"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-elevated">
          <h3 className="text-base font-semibold text-card-foreground mb-6">
            {steps[step]}
          </h3>

          {step === 0 && (
            <div className="space-y-4">
              <RadioGroup value={form.type} onValueChange={(v) => setForm({ ...form, type: v as "physique" | "morale" })} className="flex gap-4">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="physique" id="physique" />
                  <Label htmlFor="physique">Personne physique</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="morale" id="morale" />
                  <Label htmlFor="morale">Société</Label>
                </div>
              </RadioGroup>

              {form.type === "physique" ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Nom</Label>
                      <Input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Rakoto" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Prénoms</Label>
                      <Input value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} placeholder="Jean" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">N° CIN</Label>
                    <Input value={form.cin} onChange={(e) => setForm({ ...form, cin: e.target.value })} placeholder="101 012 345 678" className="mt-1" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label className="text-xs text-muted-foreground">Raison sociale</Label>
                    <Input value={form.raisonSociale} onChange={(e) => setForm({ ...form, raisonSociale: e.target.value })} className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">NIF</Label>
                      <Input value={form.nif} onChange={(e) => setForm({ ...form, nif: e.target.value })} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">STAT</Label>
                      <Input value={form.stat} onChange={(e) => setForm({ ...form, stat: e.target.value })} className="mt-1" />
                    </div>
                  </div>
                </>
              )}
              <div>
                <Label className="text-xs text-muted-foreground">Téléphone</Label>
                <Input value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} placeholder="034 12 345 67" className="mt-1" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Région</Label>
                <Select value={form.regionId} onValueChange={(v) => setForm({ ...form, regionId: v, districtId: "", communeId: "", fokontanyId: "" })}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Choisir…" /></SelectTrigger>
                  <SelectContent>{territories.regions.map((r) => <SelectItem key={r.id} value={r.id}>{r.nom}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">District</Label>
                <Select value={form.districtId} onValueChange={(v) => setForm({ ...form, districtId: v, communeId: "", fokontanyId: "" })} disabled={!form.regionId}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Choisir…" /></SelectTrigger>
                  <SelectContent>{districts.map((d) => <SelectItem key={d.id} value={d.id}>{d.nom}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Commune</Label>
                <Select value={form.communeId} onValueChange={(v) => setForm({ ...form, communeId: v, fokontanyId: "" })} disabled={!form.districtId}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Choisir…" /></SelectTrigger>
                  <SelectContent>{communes.map((c) => <SelectItem key={c.id} value={c.id}>{c.nom}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Fokontany</Label>
                <Select value={form.fokontanyId} onValueChange={(v) => setForm({ ...form, fokontanyId: v })} disabled={!form.communeId}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Choisir…" /></SelectTrigger>
                  <SelectContent>{fokontany.map((f) => <SelectItem key={f.id} value={f.id}>{f.nom}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">📍 Position GPS</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div><span className="text-muted-foreground">Lat:</span> <span className="font-mono">{form.gpsLat}</span></div>
                  <div><span className="text-muted-foreground">Lon:</span> <span className="font-mono">{form.gpsLon}</span></div>
                  <div><span className="text-muted-foreground">±</span> <span className="font-mono">{form.gpsAccuracy}m</span></div>
                </div>
                <Button variant="outline" size="sm" className="mt-2 text-xs" onClick={() => toast.info("GPS capturé !")}>
                  Capturer GPS
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Label className="text-xs text-muted-foreground">Rôle souhaité</Label>
              <RadioGroup value={form.role} onValueChange={(v) => setForm({ ...form, role: v })} className="space-y-3">
                {[
                  { value: "orpailleur", label: "Orpailleur", desc: "Exploitation artisanale, déclaration de production" },
                  { value: "collecteur", label: "Collecteur", desc: "Achat, regroupement et revente aux comptoirs" },
                  { value: "controleur", label: "Contrôleur", desc: "Vérification, contrôle terrain, verbalisation" },
                  { value: "commune", label: "Agent communal", desc: "Validation inscriptions, suivi recettes" },
                ].map((r) => (
                  <label key={r.value} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors
                    ${form.role === r.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                    <RadioGroupItem value={r.value} className="mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{r.label}</p>
                      <p className="text-xs text-muted-foreground">{r.desc}</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>

              <div>
                <Label className="text-xs text-muted-foreground mt-4 block">Pièces justificatives</Label>
                <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <p className="text-sm text-muted-foreground">Photo CIN / Documents</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => toast.info("Upload simulé !")}>
                    📷 Ajouter un document
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm font-medium text-card-foreground">Frais d'ouverture de compte</p>
                <p className="text-3xl font-display font-bold text-primary mt-1">10 000 Ar</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Bénéficiaire : Commune Ambanja – N° mVola 034 XX XXX XX
                </p>
              </div>

              <RadioGroup value={form.paymentMethod} onValueChange={(v) => setForm({ ...form, paymentMethod: v })} className="space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:border-primary/30">
                  <RadioGroupItem value="mobile_money" />
                  <span className="text-sm">Mobile Money (mVola / Orange Money / Airtel Money)</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:border-primary/30">
                  <RadioGroupItem value="card" />
                  <span className="text-sm">Carte bancaire</span>
                </label>
              </RadioGroup>

              <div className="bg-emerald-brand/5 border border-emerald-brand/20 rounded-lg p-3 flex items-start gap-2">
                <span className="text-emerald-brand">✓</span>
                <p className="text-xs text-muted-foreground">
                  Le paiement sera tracé et réconcilié. Votre compte sera activé après validation par l'agent communal.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                Précédent
              </Button>
            )}
            <Button onClick={handleNext} className="flex-1 gradient-gold text-primary-foreground font-semibold shadow-gold">
              {step < 3 ? "Suivant" : "Payer & Terminer"}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
