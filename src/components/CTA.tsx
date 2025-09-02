import Link from "next/link";

export default function CTA() {
  return (
    <section className="mt-12">
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-[var(--brand)] to-black text-white p-8 md:p-10">
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-semibold">Ready to modernize your school operations?</h2>
          <p className="text-white/80 mt-2">Start with students and staff today — expand into performance, events, and financials as you go.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/students" className="px-4 py-2 rounded-md bg-white text-black">Get Started</Link>
            <Link href="/financials/report" className="px-4 py-2 rounded-md border border-white/30 text-white">View Reports</Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full" style={{background:"radial-gradient(closest-side, rgba(255,255,255,.25), rgba(255,255,255,0))", filter:"blur(8px)"}} />
      </div>
    </section>
  );
}

