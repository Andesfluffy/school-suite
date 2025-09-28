import Link from "next/link";

export default function CTA() {
  return (
    <section className="mt-12">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#1a0106] via-[#2a0008] to-[#060606] p-8 md:p-12 text-white shadow-[0_20px_60px_-30px_rgba(217,4,41,0.7)]">
        <div className="max-w-2xl space-y-3">
          <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold">Deploy your suite with confidence</h2>
          <p className="text-white/70">
            Configure cohorts, synchronise staff, and reconcile finances in minutes. A single matte-black command centre keeps
            your team fast, focused, and audit ready.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/students"
              className="rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-500)]"
            >
              Explore students workspace
            </Link>
            <Link
              href="/financials/report"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
            >
              Review financial reports
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-24 -top-32 h-64 w-64 rounded-full opacity-80" style={{ background: "radial-gradient(closest-side, rgba(239,35,60,0.45), rgba(239,35,60,0))", filter: "blur(12px)" }} />
      </div>
    </section>
  );
}

