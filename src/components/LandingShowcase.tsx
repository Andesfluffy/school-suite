"use client";

import Link from "next/link";
import { useMemo } from "react";
import { AUTH_SIGN_IN_PATH } from "@/lib/routes";
import { useAuth } from "@/components/AuthProvider";

const heroHighlights = [
  {
    title: "Admissions that publish themselves",
    detail:
      "Custom intake checklists trigger approvals, hostel allocation, and PTA receipts once proprietors stamp “Cleared for resumption.”",
  },
  {
    title: "Academic accountability",
    detail:
      "Lesson plans, WAEC mock scripts, and interventions stay attached to each learner so tutors and counsellors share the same history before a meeting.",
  },
  {
    title: "Finance without blind spots",
    detail:
      "POS, transfer, and cash entries reconcile per guardian in real time so bursars and proprietors see the same ledger without exporting to Excel.",
  },
  {
    title: "Operations evidence trail",
    detail:
      "Duty rosters, transport sweeps, and safeguarding notes are timestamped so you can prove what happened, who handled it, and when it closed.",
  },
];

const capabilityTiles = [
  {
    title: "Admissions & compliance",
    body:
      "Screen JSS1, transfer, or international applicants with the same workflow. Once guardians sign digitally, the system pushes their data to class lists, medical files, and PTA dues.",
  },
  {
    title: "Learning delivery",
    body:
      "Teachers upload lesson notes, CA marks, and remediation plans from mobile or desktop. Heads of school see trends per subject, arm, or campus without calling for updates.",
  },
  {
    title: "Finance & bursary",
    body:
      "Map fees, levies, and concessions to each guardian. POS slips and transfers attach to the ledger instantly, while arrears roll into payment plans you can enforce.",
  },
  {
    title: "Boarding, transport & safeguarding",
    body:
      "House parents record nightly roll call, buses broadcast GPS pings, and any welfare concern escalates through the safeguarding triage with proof of follow-up.",
  },
];

const campusSignals = [
  {
    title: "Boarding roll call",
    value: "612 / 618",
    status: "99% cleared",
    detail: "House parents checked in every student by 09:05; six learners are marked for clinic review and parents already notified.",
  },
  {
    title: "Tuition reconciliation",
    value: "₦21.4m",
    status: "84% of term",
    detail: "Transfers, POS slips, and concessions sync to the same bursary ledger so finance can close the day without manual balancing.",
  },
  {
    title: "Live transport map",
    value: "27 routes",
    status: "Escorts onboard",
    detail: "Drivers, escorts, and plate numbers are confirmed with GPS pings streaming to the guardroom feed.",
  },
  {
    title: "Safeguarding queue",
    value: "4 open cases",
    status: "All assigned",
    detail: "Counsellors log welfare notes, attach evidence, and set deadlines so proprietors see resolution steps before PTA meetings.",
  },
];

const secureAssurances = [
  {
    title: "Workspace-only logins",
    detail: "Personal Gmail addresses are blocked. Only staff using the verified Google Workspace domain you whitelist can reach the cockpit.",
  },
  {
    title: "Domain & OU guardrails",
    detail: "Firebase enforces NEXT_PUBLIC_GOOGLE_WORKSPACE_DOMAIN and mirrors your organisational units so staff inherit the right scope automatically.",
  },
  {
    title: "Role-aware unlocks",
    detail: "Bursars see finance, counsellors see safeguarding, and transport heads see buses. Modules open left-to-right based on their role without overwhelming menus.",
  },
  {
    title: "Instant revocation",
    detail: "Disable a staff account in Workspace and the session terminates immediately—no parallel passwords to chase across campuses.",
  },
];

export default function LandingShowcase() {
  const { status, signInWithGoogle } = useAuth();
  const authenticating = status === "authenticating";

  const callToActionText = useMemo(
    () => (authenticating ? "Opening Google sign-in…" : "Continue with Google"),
    [authenticating],
  );

  return (
    <div className="space-y-20 pb-24">
      <section className="relative isolate -mx-4 overflow-hidden border-y border-[var(--border)] bg-white/95 px-4 pb-16 pt-12 shadow-[0_40px_120px_-60px_rgba(17,16,20,0.65)] sm:-mx-6 sm:px-10 lg:-mx-8 lg:pb-20 lg:pt-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-[-6rem] h-[32rem] w-[32rem] rounded-full bg-[var(--almond-haze)]/40 blur-[140px]" />
          <div className="absolute bottom-[-4rem] right-[-6rem] h-[28rem] w-[28rem] rounded-full bg-[var(--violet-glow)]/50 blur-[120px]" />
        </div>
        <div className="relative mx-auto grid max-w-none gap-12 lg:grid-cols-[1.2fr,0.9fr] lg:items-start">
          <div className="space-y-8 text-[var(--ink)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--muted)]/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--slate-500)]">
              Nigeria-first command centre
            </div>
            <div className="space-y-5">
              <h1 className="font-display text-[clamp(2.6rem,4.6vw,3.9rem)] font-semibold leading-tight">
                Brand-Stone School Suite keeps Nigerian campuses running with evidence-grade data—admissions, academics, finance, and welfare in one runway.
              </h1>
              <p className="text-base text-[var(--slate-600)] sm:text-lg">
                Built with Lagos and Abuja school operators, the workspace replaces scattered spreadsheets with a live control tower. Every workflow is timestamped so proprietors, bursars, and heads of school know what changed and who is accountable.
              </p>
            </div>
            <div className="grid gap-5 rounded-4xl border border-[var(--border)] bg-white/90 p-5 sm:grid-cols-2">
              {heroHighlights.map((highlight) => (
                <div key={highlight.title} className="space-y-2 text-sm text-[var(--slate-600)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--slate-500)]">{highlight.title}</p>
                  <p>{highlight.detail}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={() => void signInWithGoogle()}
                disabled={authenticating}
                className="inline-flex min-w-[240px] items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-7 py-3 text-sm font-semibold text-white shadow-[0_28px_60px_-34px_rgba(238,72,17,0.95)] transition hover:bg-[var(--brand-500)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[var(--brand-700)]">
                  G
                </span>
                {callToActionText}
              </button>
              <Link
                href={AUTH_SIGN_IN_PATH}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--slate-700)] shadow-sm transition hover:border-[var(--brand)]/40 hover:text-[var(--brand-600)]"
              >
                Download the rollout brief
                <span aria-hidden>→</span>
              </Link>
            </div>
            <p className="text-sm text-[var(--slate-500)]">
              Verified Google Workspace staff accounts unlock the live dashboards, registers, and cash modules. The landing preview never shows actual student data.
            </p>
          </div>

          <div className="space-y-5 rounded-[32px] border border-[var(--border)] bg-white/90 p-6 shadow-[0_40px_100px_-52px_rgba(23,22,29,0.45)] backdrop-blur-sm">
            <div className="flex items-center justify-between rounded-2xl bg-[var(--muted)] px-4 py-3 text-[var(--slate-700)]">
              <div>
                <p className="text-sm font-semibold">Live campus feed</p>
                <p className="text-xs text-[var(--slate-500)]">Streams every 60 seconds once your Workspace domain is verified.</p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--brand-700)]">Active</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {campusSignals.map((signal) => (
                <div key={signal.title} className="rounded-2xl border border-[var(--border)] bg-white p-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-[var(--slate-500)]">
                    <span>{signal.title}</span>
                    <span className="rounded-full bg-[var(--muted)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--slate-600)]">
                      {signal.status}
                    </span>
                  </div>
                  <p className="mt-3 text-3xl font-semibold text-[var(--ink)]">{signal.value}</p>
                  <p className="text-sm text-[var(--slate-500)]">{signal.detail}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-r from-[var(--violet-glow)]/35 via-white to-[var(--almond-haze)]/50 p-5">
              <p className="text-sm font-semibold text-[var(--ink)]">No demo fluff</p>
              <p className="mt-2 text-sm text-[var(--slate-600)]">
                The feed pipes data from registers, bursary, transport, and safeguarding modules. When you sign out, the stream pauses and the cards freeze for privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[38px] border border-[var(--border)] bg-white/85 px-6 py-14 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.25)] sm:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--slate-500)]">Operational playbooks</p>
            <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.5rem)] font-semibold text-[var(--ink)]">Daily Nigerian school work inside one verifiable workspace.</h2>
            <p className="mt-2 text-sm text-[var(--slate-600)] sm:text-base">
              Every module writes to the same record so you can audit a learner, guardian, or bus without hunting through WhatsApp chats or Excel tabs.
            </p>
          </div>
          <Link
            href={AUTH_SIGN_IN_PATH}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--slate-700)] shadow-sm transition hover:border-[var(--brand)]/50 hover:text-[var(--brand-600)]"
          >
            Review activation guide
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilityTiles.map((tile) => (
            <div key={tile.title} className="h-full rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_20px_50px_-40px_rgba(122,97,143,0.55)]">
              <h3 className="text-lg font-semibold text-[var(--ink)]">{tile.title}</h3>
              <p className="mt-2 text-sm text-[var(--slate-600)]">{tile.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[42px] border border-[var(--border)] bg-white px-6 py-14 shadow-[0_30px_90px_-54px_rgba(23,22,29,0.4)] sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 py-1 text-xs uppercase tracking-[0.32em] text-[var(--slate-500)]">
              Secure entry for Nigerian campuses
            </div>
            <h2 className="font-display text-[clamp(1.9rem,3.1vw,2.5rem)] font-semibold text-[var(--ink)]">
              Google Workspace is the key. Once verified, School Suite mirrors your structure and keeps family records private.
            </h2>
            <p className="text-sm text-[var(--slate-600)] sm:text-base">
              We use the same policies your IT team already enforces. Point <code className="rounded bg-[var(--muted)] px-1.5 py-0.5 text-xs">NEXT_PUBLIC_GOOGLE_WORKSPACE_DOMAIN</code> at your school domain and every login respects it automatically.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {secureAssurances.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[var(--border)] bg-white/90 p-4 shadow-sm">
                  <p className="text-sm font-semibold text-[var(--ink)]">{item.title}</p>
                  <p className="mt-1 text-sm text-[var(--slate-600)]">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-[32px] border border-[var(--border)] bg-gradient-to-br from-[var(--violet-glow)]/30 via-white to-[var(--almond-haze)]/60 p-6 text-[var(--slate-700)] shadow-[0_30px_100px_-56px_rgba(23,22,29,0.45)]">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.32em] text-[var(--slate-500)]">Secure entry</p>
              <h3 className="font-display text-xl font-semibold text-[var(--ink)]">How schools unlock the cockpit</h3>
              <ol className="space-y-3 text-sm text-[var(--slate-600)]">
                <li>
                  <span className="font-semibold text-[var(--ink)]">1. Verified identity.</span> Staff sign in with Workspace. We block any mismatched or personal email before the landing data even loads.
                </li>
                <li>
                  <span className="font-semibold text-[var(--ink)]">2. Domain handshake.</span> Firebase matches <code className="rounded bg-white/60 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_GOOGLE_WORKSPACE_DOMAIN</code> before returning dashboards or the live feed.
                </li>
                <li>
                  <span className="font-semibold text-[var(--ink)]">3. Role-scoped unlocks.</span> Once accepted, modules appear left-to-right following your OU (admin, bursary, academics, transport) so no one sees sensitive data by accident.
                </li>
              </ol>
            </div>
            <button
              type="button"
              onClick={() => void signInWithGoogle()}
              disabled={authenticating}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--brand)] bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_24px_60px_-28px_rgba(238,72,17,0.9)] transition hover:bg-[var(--brand-500)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {callToActionText}
            </button>
            <div className="rounded-2xl border border-dashed border-[var(--border)] bg-white/70 p-4 text-sm text-[var(--slate-600)]">
              Have a demo Workspace domain? Whitelist it in <code className="rounded bg-[var(--muted)] px-1.5 py-0.5 text-xs">NEXT_PUBLIC_GOOGLE_WORKSPACE_DOMAIN</code> and you can rehearse the sign-in flow with sample data.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
