"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

export default function SignInCard() {
  const {
    status,
    user,
    session,
    error,
    onboarding,
    signInWithGoogle,
    signOut,
    completeOnboarding,
  } = useAuth();
  const router = useRouter();
  const authenticating = status === "authenticating";
  const onboardingMode = status === "onboarding" && Boolean(onboarding);
  const unauthorized = status === "unauthorized";
  const [schoolName, setSchoolName] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      const t = setTimeout(() => {
        router.prefetch("/students");
      }, 200);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [router, session, status]);

  useEffect(() => {
    if (onboarding?.domain) {
      setSchoolName((current) => current || `${onboarding.domain.split(".")[0] ?? ""} School`.trim());
    }
  }, [onboarding]);

  const handleOnboarding = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!schoolName.trim()) {
      setFormError("Enter your school name to continue.");
      return;
    }
    setFormError(null);
    await completeOnboarding({ schoolName: schoolName.trim(), role: "admin" });
  };

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
          {authenticating ? "Connecting to Google Workspace…" : "Launch school login"}
        </button>
      ) : onboardingMode ? (
        <form onSubmit={handleOnboarding} className="space-y-4 rounded-lg border border-white/10 bg-black/40 p-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/50">Domain detected</p>
            <p className="text-sm text-white/70">{onboarding?.domain}</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wide text-white/60" htmlFor="school-name">
              School name
            </label>
            <input
              id="school-name"
              name="school"
              value={schoolName}
              onChange={(event) => setSchoolName(event.target.value)}
              placeholder="e.g. Brand-Stone Academy"
              className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white focus:border-[var(--brand)] focus:outline-none"
            />
            <p className="text-xs text-white/50">
              The suite will create a new school profile for <span className="text-white">{user.email}</span> on the domain
              <span className="text-white"> @{onboarding?.domain}</span>.
            </p>
          </div>
          {formError ? <p className="text-sm text-rose-300">{formError}</p> : null}
          <button
            type="submit"
            disabled={authenticating}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand-500)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {authenticating ? "Creating school…" : "Create school workspace"}
          </button>
        </form>
      ) : unauthorized ? (
        <div className="space-y-4 rounded-lg border border-rose-500/30 bg-rose-500/10 p-5 text-white">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-white/70">Access blocked</p>
            <p className="text-sm text-white/80">
              {error || "Your Google Workspace account is not provisioned for this school."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => void signOut()}
            className="w-full rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
          >
            Sign out
          </button>
        </div>
      ) : session ? (
        <div className="space-y-4 rounded-lg border border-white/10 bg-black/40 p-5">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-white/50">Signed in as</p>
            <p className="font-medium text-white">{user.name}</p>
            <p className="text-sm text-white/60">{user.email}</p>
          </div>
          <div className="space-y-1 rounded-md border border-white/15 bg-white/5 p-3 text-sm text-white/80">
            <p className="text-xs uppercase tracking-wide text-white/60">School workspace</p>
            <p className="font-semibold text-white">{session.school.name}</p>
            <p className="text-xs text-white/60">@{session.school.domain}</p>
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
              onClick={() => void signOut()}
              className="flex-1 rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 rounded-lg border border-white/10 bg-black/40 p-5">
          <p className="text-sm text-white/70">Establishing your workspace session…</p>
          <button
            type="button"
            onClick={() => void signOut()}
            className="w-full rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      )}

      {error && !unauthorized && !onboardingMode ? (
        <div className="rounded-md border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-100">{error}</div>
      ) : null}

      <div className="rounded-md border border-white/10 bg-black/40 p-4 text-xs text-white/60">
        <p className="font-semibold uppercase tracking-wide text-white/50">Trustworthy identity</p>
        <p className="mt-1">
          Authentication is powered by Firebase Auth, so sessions follow Google&apos;s secure storage and revocation policies. Use the
          sign-out button above to end the Workspace link instantly on this device.
        </p>
      </div>
    </div>
  );
}
