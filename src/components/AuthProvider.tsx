"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type AuthStatus = "initializing" | "idle" | "authenticating" | "authenticated";

export type AuthUser = {
  name: string;
  email: string;
  picture?: string;
};

type AuthContextValue = {
  status: AuthStatus;
  user: AuthUser | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "school-suite:auth";

const fallbackProfiles: AuthUser[] = [
  { name: "Ada Lovelace", email: "ada.lovelace@brandstone.edu" },
  { name: "Chinaza Okafor", email: "chinaza.okafor@brandstone.edu" },
  { name: "Mateo Sánchez", email: "mateo.sanchez@brandstone.edu" },
];

function pickProfile(seed: number) {
  return fallbackProfiles[seed % fallbackProfiles.length];
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("initializing");
  const [user, setUser] = useState<AuthUser | null>(null);
  const syncRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || syncRef.current) return;
    syncRef.current = true;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setStatus("idle");
        return;
      }
      const parsed = JSON.parse(raw) as AuthUser | null;
      if (parsed) {
        setUser(parsed);
        setStatus("authenticated");
      } else {
        setStatus("idle");
      }
    } catch (err) {
      console.warn("Failed to restore auth state", err);
      setStatus("idle");
    }
  }, []);

  const signInWithGoogle = async () => {
    if (status === "authenticating") return;
    setStatus("authenticating");
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const profile = pickProfile(Math.floor(Math.random() * 10));
      setUser(profile);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      }
      setStatus("authenticated");
    } catch (error) {
      console.error("Google sign in failed", error);
      setStatus(user ? "authenticated" : "idle");
    }
  };

  const signOut = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setUser(null);
    setStatus("idle");
  };

  return (
    <AuthContext.Provider
      value={{
        status,
        user,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}

