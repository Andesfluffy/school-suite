"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

export default function SignInCard() {
  const { status, user, signInWithGoogle, signOut } = useAuth();
  const router = useRouter();
  const authenticating = status === "authenticating";

  useEffect(() => {
    if (status === "authenticated" && user) {
      const t = setTimeout(() => {
        router.prefetch("/students");
      }, 200);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [router, status, user]);

  return (
    <div className="card space-y-6 p-6 sm:p-8">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold text-white">Secure school login</h2>
        <p className="text-sm text-white/70">
          Connect with your Google Workspace tenancy to unlock students, staff, finance, performance, and events dashboards in
          one matte-black cockpit.
        </p>
      </div>

      {!user ? (
        <button
          type="button"
          onClick={() => void signInWithGoogle()}
          disabled={authenticating}
          className="flex w-full items-center justify-center gap-3 rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-[var(--brand-500)] hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-500)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
            G
          </span>
          {authenticating ? "Connecting to Google…" : "Launch school login"}
        </button>
      ) : (
        <div className="space-y-4 rounded-lg border border-white/10 bg-black/40 p-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/50">Signed in as</p>
            <p className="font-medium text-white">{user.name}</p>
            <p className="text-sm text-white/60">{user.email}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/students"
              className="flex-1 rounded-md bg-[var(--brand)] px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-[var(--brand-500)]"
            >
              Continue to dashboard
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="flex-1 rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        </div>
      )}

      <div className="rounded-md border border-white/10 bg-black/40 p-4 text-xs text-white/60">
        <p className="font-semibold uppercase tracking-wide text-white/50">Deployment ready</p>
        <p className="mt-1">
          Auth state is stored locally so builds and previews stay deterministic. You can reset access anytime using the sign-out
          button above.
        </p>
      </div>
    </div>
  );
}

