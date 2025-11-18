import Link from "next/link";
import { AUTH_SIGN_IN_PATH } from "@/lib/routes";

export default function CTA() {
  return (
    <section className="mt-12">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#1a0106] via-[#2a0008] to-[#060606] p-8 md:p-12 text-white shadow-[0_20px_60px_-30px_rgba(217,4,41,0.7)]">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.32em] text-white/50">Ready when you are</p>
          <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.3rem)] font-semibold">White-glove rollout for your leadership team</h2>
          <p className="text-white/70">
            We pair the refined Brand‑Stone interface with onboarding workshops, configuration playbooks, and a command runway
            for bursary, academics, and HR. Your administrators stay in control, your data stays compliant, and the experience
            feels premium from day zero.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href={AUTH_SIGN_IN_PATH}
              className="rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-500)]"
            >
              Initiate school login
            </Link>
            <Link
              href="/events"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
            >
              Preview engagement tools
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-24 -top-32 h-64 w-64 rounded-full opacity-80" style={{ background: "radial-gradient(closest-side, rgba(239,35,60,0.45), rgba(239,35,60,0))", filter: "blur(12px)" }} />
      </div>
    </section>
  );
}

