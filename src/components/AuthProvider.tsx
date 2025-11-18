"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { loadFirebaseAuth } from "@/lib/firebase-client";
import type { FirebaseAuthUser, FirebaseGoogleAuthProvider } from "@/lib/firebase-client";

export type AuthStatus =
  | "initializing"
  | "idle"
  | "authenticating"
  | "authenticated"
  | "onboarding"
  | "unauthorized";

export type AuthUser = {
  uid: string;
  name: string;
  email: string;
  picture?: string;
};

export type AuthSession = {
  school: {
    id: string;
    name: string;
    domain: string;
  };
  membership: {
    id: string;
    email: string;
    googleUid: string;
    role: "admin" | "staff";
    staffId?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  staff: {
    id: string;
    name: string;
    role: string;
  } | null;
};

type OnboardingState = {
  domain: string;
  email: string;
};

type AuthContextValue = {
  status: AuthStatus;
  user: AuthUser | null;
  session: AuthSession | null;
  error: string | null;
  onboarding: OnboardingState | null;
  signInWithGoogle: () => Promise<void>;
  completeOnboarding: (input: { schoolName: string; role?: "admin" | "staff" }) => Promise<void>;
  refreshSession: () => Promise<void>;
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

async function requestSession(payload: {
  uid: string;
  email: string;
  name: string;
  schoolName?: string;
  role?: "admin" | "staff";
  idToken: string;
}) {
  const response = await fetch("/api/auth/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.idToken}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const error = data?.error || "Unable to establish school session";
    const code = data?.code as string | undefined;
    throw Object.assign(new Error(error), { code, meta: data });
  }
  return data as AuthSession;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("initializing");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [onboarding, setOnboarding] = useState<OnboardingState | null>(null);

  const resolveSession = useCallback(
    async (authUser: AuthUser, overrides?: { schoolName?: string; role?: "admin" | "staff" }) => {
      if (!authUser.email) {
        setError("Your Google account is missing an email address.");
        setSession(null);
        setOnboarding(null);
        setStatus("unauthorized");
        return;
      }
      setStatus("authenticating");
      setError(null);
      try {
        const { auth } = await loadFirebaseAuth();
        const idToken = await auth.currentUser?.getIdToken();
        if (!idToken) {
          throw new Error("Unable to fetch ID token from Firebase.");
        }
        const nextSession = await requestSession({
          uid: authUser.uid,
          email: authUser.email,
          name: authUser.name,
          schoolName: overrides?.schoolName,
          role: overrides?.role,
          idToken,
        });
        setSession(nextSession);
        setOnboarding(null);
        setStatus("authenticated");
      } catch (caught) {
        const err = caught as { message: string; code?: string; meta?: unknown };
        console.warn("Failed to resolve school session", err);
        setSession(null);
        const code = err.code;
        if (code === "SCHOOL_NOT_FOUND" && authUser.email.includes("@")) {
          const domain = authUser.email.split("@")[1]?.toLowerCase() ?? "";
          setOnboarding({ domain, email: authUser.email });
          setStatus("onboarding");
          setError(null);
        } else if (code === "MEMBERSHIP_NOT_FOUND" || code === "DOMAIN_MISMATCH") {
          setStatus("unauthorized");
          setError(err.message);
          setOnboarding(null);
        } else {
          setStatus("unauthorized");
          setError(err.message || "Unable to authorise your account right now.");
          setOnboarding(null);
        }
      }
    },
    [],
  );

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
              const mapped = mapFirebaseUser(firebaseUser);
              setUser(mapped);
              void resolveSession(mapped);
            } else {
              setUser(null);
              setSession(null);
              setOnboarding(null);
              setError(null);
              setStatus("idle");
              void fetch("/api/auth/session", { method: "DELETE" }).catch(() => undefined);
            }
          },
          (err: unknown) => {
            console.error("Auth state listener error", err);
            setUser(null);
            setSession(null);
            setOnboarding(null);
            setError("Unable to initialise authentication");
            setStatus("idle");
          },
        );
        if (!cancelled) {
          setStatus("idle");
        }
      } catch (loadError) {
        console.error("Failed to initialise Firebase auth", loadError);
        if (!cancelled) {
          setUser(null);
          setSession(null);
          setOnboarding(null);
          setError("Unable to start authentication");
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
  }, [resolveSession]);

  const signInWithGoogle = useCallback(async () => {
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
    } catch (signInError) {
      console.error("Google sign in failed", signInError);
      setStatus(user ? "authenticated" : "idle");
    }
  }, [status, user]);

  const completeOnboarding = useCallback(
    async (input: { schoolName: string; role?: "admin" | "staff" }) => {
      if (!user) {
        return;
      }
      await resolveSession(user, input);
    },
    [resolveSession, user],
  );

  const refreshSession = useCallback(async () => {
    if (!user) return;
    await resolveSession(user);
  }, [resolveSession, user]);

  const signOut = useCallback(async () => {
    try {
      const { auth } = await loadFirebaseAuth();
      await auth.signOut();
    } catch (signOutError) {
      console.error("Failed to sign out", signOutError);
    } finally {
      setUser(null);
      setSession(null);
      setOnboarding(null);
      setError(null);
      setStatus("idle");
      void fetch("/api/auth/session", { method: "DELETE" }).catch(() => undefined);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      session,
      error,
      onboarding,
      signInWithGoogle,
      completeOnboarding,
      refreshSession,
      signOut,
    }),
    [status, user, session, error, onboarding, signInWithGoogle, completeOnboarding, refreshSession, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}
