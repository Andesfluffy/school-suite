import type { Metadata } from "next";
import SignInCard from "@/components/SignInCard";

const highlights = [
  {
    title: "One launch unlocks every workspace",
    blurb: "Students, staff, events, performance, and finance modules stay linked to the same Google identity.",
  },
  {
    title: "Hardened for leadership teams",
    blurb: "Role-aware dashboards, export-ready records, and an audit trail friendly interface ship as standard.",
  },
  {
    title: "Always deterministic for demos",
    blurb: "Authentication lives in secure local storage so previews stay stable while showcasing the full experience.",
  },
];

export const metadata: Metadata = {
  title: "Sign in · Brand‑Stone School Suite",
  description: "Authenticate with Google Workspace to open the Brand‑Stone home workspace.",
};

export default function SignInPage() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#080808]/95 px-6 py-10 text-white shadow-[0_32px_120px_-60px_rgba(217,4,41,0.6)] sm:px-10 sm:py-14 lg:px-14 lg:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(110rem_90rem_at_15%_20%,rgba(217,4,41,0.22),transparent)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#2a0008]/45 via-transparent to-transparent" aria-hidden />
      <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
            <span className="h-2 w-2 rounded-full bg-[var(--brand)] shadow-[0_0_10px_rgba(217,4,41,0.8)]" aria-hidden />
            School suite access
          </div>
          <div className="space-y-4">
            <h1 className="font-display text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-[1.05]">
              Sign in to Brand‑Stone School Suite
            </h1>
            <p className="max-w-2xl text-sm text-white/70 sm:text-base">
              Catch the full command center in a single glance. Authenticate with Google Workspace to move seamlessly from enrolment to staffing, finance, and community moments without leaving this matte cockpit.
            </p>
          </div>
          <ul className="grid gap-4 text-sm text-white/70 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item.title} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-xs text-white/60 sm:text-sm sm:text-white/70">{item.blurb}</p>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2 text-xs uppercase tracking-[0.28em] text-white/45">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--brand)]" aria-hidden />Federated security
            </span>
            <span>Audit trail ready</span>
            <span>Zero passwords stored</span>
          </div>
        </div>
        <SignInCard />
      </div>
    </section>
  );
}

