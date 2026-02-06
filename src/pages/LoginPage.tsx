import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { demoUsers } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const roleIcons: Record<string, string> = {
  orpailleur: "⛏",
  collecteur: "📦",
  commune: "🏛",
  controleur: "🔍",
  comptoir: "🏪",
  dirigeant: "📊",
  com: "🏅",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, filiere } = useAuth();
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  const filiereLabel = filiere === "or" ? "Or" : filiere === "pierre" ? "Pierres" : "Bois";
  const filiereColor = filiere === "or" ? "text-primary" : filiere === "pierre" ? "text-sapphire" : "text-timber";

  const handleDemoLogin = (userId: string) => {
    login(userId);
    navigate("/dashboard");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In demo mode, fallback to first orpailleur
    login("U001");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen gradient-dark flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-60 h-60 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-primary-foreground/40 text-sm hover:text-primary-foreground/60 transition-colors mb-4 inline-block"
          >
            ← Changer de filière
          </button>
          <h1 className="text-3xl font-display font-bold text-primary-foreground">
            MADA<span className="text-primary">VOLA</span>
          </h1>
          <p className={`text-sm mt-1 font-medium ${filiereColor}`}>
            Filière {filiereLabel}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-card rounded-2xl p-8 shadow-elevated">
          <h2 className="text-lg font-semibold text-card-foreground mb-6">Connexion</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="phone" className="text-sm text-muted-foreground">
                Téléphone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="034 12 345 67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="pin" className="text-sm text-muted-foreground">
                Code PIN / OTP
              </Label>
              <Input
                id="pin"
                type="password"
                placeholder="••••"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full gradient-gold text-primary-foreground font-semibold shadow-gold">
              Se connecter
            </Button>
          </form>

          <div className="mt-4 flex items-center justify-between text-sm">
            <button
              onClick={() => navigate("/register")}
              className="text-primary hover:underline"
            >
              Créer un compte
            </button>
            <button className="text-muted-foreground hover:text-foreground">
              Mot de passe oublié ?
            </button>
          </div>
        </div>

        {/* Demo Accounts */}
        <div className="mt-6 bg-card/80 backdrop-blur rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Separator className="flex-1" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap">
              Comptes démo
            </span>
            <Separator className="flex-1" />
          </div>

          <div className="grid grid-cols-1 gap-2">
            {demoUsers.map((user) => (
              <motion.button
                key={user.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDemoLogin(user.id)}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left group"
              >
                <span className="text-xl w-8 text-center">{roleIcons[user.role]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground truncate">
                    {user.label}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.description}
                  </p>
                </div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                >
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
