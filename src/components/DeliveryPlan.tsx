import Reveal from "@/components/Reveal";

const foundations = [
  {
    title: "Operational workspaces ready",
    detail: "Students, staff, performance, events, and finance modules ship with dashboards, inline updates, and exports.",
  },
  {
    title: "Matte-black design system",
    detail: "Consistent typography, glass surfaces, and card treatments keep the suite premium and cohesive across pages.",
  },
  {
    title: "Google Workspace authentication",
    detail: "Federated login keeps access aligned to the school domain while remaining deterministic for demos and QA.",
  },
];

const roadmap = [
  {
    phase: "01 · Data onboarding",
    focus: "Bulk import rosters, staff records, and historical finance files with validation scripts and sandbox reviews.",
  },
  {
    phase: "02 · Controls & automations",
    focus: "Layer approvals, reminders, and integrations for bursary, HR, and academic workflows on top of the suite.",
  },
  {
    phase: "03 · Launch & adoption",
    focus: "Coach administrators, publish knowledge base artefacts, and monitor usage dashboards post go-live.",
  },
];

export default function DeliveryPlan() {
  return (
    <section id="delivery" className="mt-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-[#0b0b0b]/90 p-8 shadow-[0_28px_90px_-45px_rgba(217,4,41,0.55)]">
            <p className="text-xs uppercase tracking-[0.32em] text-white/40">What is live today</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-white">Foundation locked in</h2>
            <p className="mt-3 text-sm text-white/70">
              Brand‑Stone already ships as a unified school cockpit. These are the pillars currently hardened inside the demo.
            </p>
            <ul className="mt-6 space-y-4 text-sm text-white/75">
              {foundations.map((item) => (
                <li key={item.title} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand)]/80 text-[11px] font-semibold text-white">✓</span>
                    <div>
                      <p className="font-medium text-white">{item.title}</p>
                      <p className="mt-1 text-white/60">{item.detail}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#120205]/90 via-[#18050a]/85 to-[#050505]/90 p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-white/40">How we go further</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-white">Next moves for a pristine rollout</h2>
            <p className="mt-3 text-sm text-white/70">
              A deliberate three-phase plan ensures the suite transitions from polished prototype to production operations with your school.
            </p>
            <ol className="mt-6 space-y-4">
              {roadmap.map((item, index) => (
                <li key={item.phase} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:border-white/20">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" aria-hidden />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/40">
                      <span>{item.phase}</span>
                      <span>Phase {index + 1}</span>
                    </div>
                    <p className="text-sm text-white/75 leading-relaxed">{item.focus}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
              <p className="font-semibold uppercase tracking-[0.32em] text-white/45">Support cadence</p>
              <p className="mt-2 leading-relaxed">
                Weekly steering sessions with school leadership, async status reports, and a shared issue board keep the programme crisp and accountable.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
