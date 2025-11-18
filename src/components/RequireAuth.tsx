"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { useAuth } from "./AuthProvider";
import { AUTH_SIGN_IN_PATH } from "@/lib/routes";

export default function RequireAuth({
  children,
  section,
  blurb,
}: {
  children: ReactNode;
  section: string;
  blurb?: string;
}) {
  const { status, user, error, onboarding, signInWithGoogle, signOut } = useAuth();
  const loading = status === "initializing" || status === "authenticating";
  const onboardingMode = status === "onboarding";
  const unauthorized = status === "unauthorized";

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border border-white/20 border-t-white" aria-hidden />
          <span>Confirming school access…</span>
        </div>
      </div>
    );
  }

  if (!user || onboardingMode || unauthorized) {
    const headline = onboardingMode
      ? "Finish school onboarding"
      : unauthorized
        ? "Workspace access denied"
        : "School login required";
    const message = onboardingMode
      ? `Create your ${onboarding?.domain ?? "school"} workspace from the sign-in page.`
      : unauthorized
        ? error ?? "Your Google Workspace account is not provisioned for this module."
        : blurb ?? `Authenticate with your Google Workspace identity to open the ${section}.`;
    return (
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#090909]/95 p-8 sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#2a0008]/40 via-transparent to-transparent" aria-hidden />
        <div className="relative max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/55">
            <span className="h-2 w-2 rounded-full bg-[var(--brand)] shadow-[0_0_10px_rgba(217,4,41,0.8)]" aria-hidden />
            Restricted workspace
          </div>
          <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold text-white">{headline}</h2>
          <p className="text-sm text-white/70">{message}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            {unauthorized ? (
              <button
                type="button"
                onClick={() => void signOut()}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10"
              >
                Sign out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void signInWithGoogle()}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-500)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-500)]"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-black">G</span>
                Launch school login
              </button>
            )}
            <Link
              href={AUTH_SIGN_IN_PATH}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
            >
              View access details
            </Link>
          </div>
          <ul className="grid gap-2 text-xs text-white/50 sm:grid-cols-2">
            {["Audit trail ready", "Role-based permissions", "Secure local storage", "Demo resets anytime"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/20 text-[9px] text-white">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
