import type { Metadata } from "next";
import SignInCard from "@/components/SignInCard";

const highlights = [
  {
    title: "One launch unlocks every workspace",
    blurb:
      "Students, staff, events, performance, and finance modules stay linked to the same Google identity.",
  },
  {
    title: "Hardened for leadership teams",
    blurb:
      "Role-aware dashboards, export-ready records, and an audit-trail-friendly interface meet the governance demands of modern school groups.",
  },
  {
    title: "Always deterministic for demos",
    blurb:
      "Authentication lives in secure local storage so previews stay stable while showcasing the full experience end to end.",
  },
  {
    title: "Minutes to onboard",
    blurb:
      "Federated SSO keeps staff in flow—no extra passwords, no confusing invites, just tap and lead.",
  },
];

export const metadata: Metadata = {
  title: "Sign in · Brand-Stone School Suite",
  description:
    "Authenticate with Google Workspace to open the Brand-Stone home workspace.",
};

export default function SignInPage() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-[#0e1314]/95 px-6 py-12 text-white shadow-[0_32px_120px_-60px_rgba(var(--brand-rgb),0.6)] sm:px-10 lg:px-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(110rem_90rem_at_12%_18%,rgba(var(--brand-rgb),0.22),transparent)]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1b2d24]/45 via-transparent to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_minmax(0,0.9fr)]">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-white/60">
            <span
              className="h-2 w-2 rounded-full bg-[var(--brand)] shadow-[0_0_12px_rgba(var(--brand-rgb),0.8)]"
              aria-hidden
            />
            Brand-Stone School Suite
          </div>

          <div className="space-y-5">
            <h1 className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-[1.05]">
              Sign in to Brand-Stone School Suite
            </h1>
            <p className="max-w-2xl text-sm text-white/70 sm:text-base">
              Authenticate with Google Workspace to move seamlessly across
              enrolment, staffing, finance, and community touchpoints—your
              command deck without the noise.
            </p>
          </div>

          <dl className="grid gap-4 text-sm text-white/70 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-[var(--brand)]/60 hover:shadow-[0_24px_60px_-35px_rgba(var(--brand-rgb),0.55)]"
              >
                <dt className="font-semibold text-white">{item.title}</dt>
                <dd className="mt-2 text-xs text-white/60 sm:text-sm sm:text-white/70">
                  {item.blurb}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-3 pt-1 text-[11px] uppercase tracking-[0.32em] text-white/45">
            <span className="inline-flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full bg-[var(--brand)]"
                aria-hidden
              />
              Federated security
            </span>
            <span>Audit trail ready</span>
            <span>Zero passwords stored</span>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-black/40 p-1 shadow-[0_24px_80px_-60px_rgba(var(--brand-rgb),0.8)] backdrop-blur">
            <SignInCard />
          </div>
        </div>
      </div>
    </section>
  );
}
