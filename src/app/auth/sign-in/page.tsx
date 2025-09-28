import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SignInCard from "@/components/SignInCard";

export const metadata: Metadata = {
  title: "Sign in · Brand‑Stone School Suite",
  description: "Authenticate with Google to access Brand‑Stone School Suite.",
};

export default function SignInPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Sign in"
        subtitle="Authenticate with Google Workspace to access students, staff, performance, events, and financial dashboards."
      />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <SignInCard />
        <aside className="card space-y-4 p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold text-white">Why Google?</h2>
          <p className="text-sm text-white/70">
            Brand‑Stone uses federated Google sign-in so administrators inherit your organisation&apos;s security policies including
            multi-factor authentication and session lifetimes.
          </p>
          <div className="rounded-lg border border-white/10 bg-black/40 p-4 text-xs text-white/60">
            <p className="font-semibold uppercase tracking-wide text-white/50">Need an invite?</p>
            <p className="mt-1">
              Contact your district technology lead to request a Brand‑Stone workspace seat. Once invited, sign in here with the
              same Google account.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/40 p-4 text-xs text-white/60">
            <p className="font-semibold uppercase tracking-wide text-white/50">Privacy by design</p>
            <p className="mt-1">
              We never store your Google password. This demo keeps the authenticated state on-device only so test builds and
              deployments remain deterministic.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

