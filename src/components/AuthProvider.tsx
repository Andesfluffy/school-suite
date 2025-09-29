"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { loadFirebaseAuth } from "@/lib/firebase-client";
import type { FirebaseAuthUser, FirebaseGoogleAuthProvider } from "@/lib/firebase-client";

type AuthStatus = "initializing" | "idle" | "authenticating" | "authenticated";

export type AuthUser = {
  uid: string;
  name: string;
  email: string;
  picture?: string;
};

type AuthContextValue = {
  status: AuthStatus;
  user: AuthUser | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function mapFirebaseUser(firebaseUser: FirebaseAuthUser): AuthUser {
  const displayName = firebaseUser.displayName || firebaseUser.email || "School administrator";
  return {
    uid: firebaseUser.uid,
    name: displayName,
    email: firebaseUser.email ?? "",
    picture: firebaseUser.photoURL ?? undefined,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("initializing");
  const [user, setUser] = useState<AuthUser | null>(null);
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      try {
        const { auth } = await loadFirebaseAuth();
        if (cancelled) {
          return;
        }
        unsubscribe = auth.onAuthStateChanged(
          (firebaseUser) => {
            if (firebaseUser) {
              setUser(mapFirebaseUser(firebaseUser));
              setStatus("authenticated");
            } else {
              setUser(null);
              setStatus("idle");
            }
          },
          (error: unknown) => {
            console.error("Auth state listener error", error);
            setUser(null);
            setStatus("idle");
          },
        );
      } catch (error) {
        console.error("Failed to initialise Firebase auth", error);
        if (!cancelled) {
          setUser(null);
          setStatus("idle");
        }
      }
    })();

    return () => {
      cancelled = true;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const signInWithGoogle = async () => {
    if (status === "authenticating") return;
    setStatus("authenticating");
    try {
      const { auth, firebase } = await loadFirebaseAuth();
      const provider: FirebaseGoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
      const workspaceDomain = process.env.NEXT_PUBLIC_GOOGLE_WORKSPACE_DOMAIN;
      if (workspaceDomain) {
        provider.setCustomParameters({ hd: workspaceDomain });
      }
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error("Google sign in failed", error);
      setStatus(user ? "authenticated" : "idle");
    }
  };

  const signOut = async () => {
    try {
      const { auth } = await loadFirebaseAuth();
      await auth.signOut();
    } catch (error) {
      console.error("Failed to sign out", error);
    } finally {
      setUser(null);
      setStatus("idle");
    }
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
