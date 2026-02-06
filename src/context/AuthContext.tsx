import React, { createContext, useContext, useState, useCallback } from "react";
import { DemoUser, Filiere, demoUsers } from "@/data/mockData";

interface AuthContextType {
  user: DemoUser | null;
  filiere: Filiere;
  setFiliere: (f: Filiere) => void;
  login: (userId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [filiere, setFiliere] = useState<Filiere>("or");

  const login = useCallback((userId: string) => {
    const found = demoUsers.find((u) => u.id === userId);
    if (found) setUser(found);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        filiere,
        setFiliere,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
