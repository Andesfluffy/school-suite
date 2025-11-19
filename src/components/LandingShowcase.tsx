"use client";

import Link from "next/link";
import { useMemo } from "react";
import { AUTH_SIGN_IN_PATH } from "@/lib/routes";
import { useAuth } from "@/components/AuthProvider";

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Security", href: "#security" },
  { label: "Workflows", href: "#flows" },
];

const heroStats = [
  {
    label: "Campuses orchestrated",
    value: "42",
    context: "across Lagos, Abuja, Port Harcourt",
  },
  {
    label: "Modules on",
    value: "8",
    context: "Admissions to transport dispatch",
  },
  {
    label: "Issues resolved",
    value: "1.8k / term",
    context: "with timestamped evidence trails",
  },
];

const moduleShowcase = [
  {
    title: "Admissions runway",
    detail:
      "Screen entrance tests, medical files, and fee approvals in one lane. Once accepted, the learner appears instantly on class lists and PTA dues.",
  },
  {
    title: "Learning pulse",
    detail:
      "Lesson notes, CA marks, and remediation plans sit together so heads of school can see where to intervene without calling for updates.",
  },
  {
    title: "Finance cockpit",
    detail:
      "POS slips, transfers, and concessions reconcile per guardian. Proprietors view live tuition health without exporting to spreadsheets.",
  },
  {
    title: "Care & transport",
    detail:
      "Boarding roll call, bus GPS pings, and safeguarding notes follow the same learner timeline so nothing slips between WhatsApp chats.",
  },
];

const workflowMoments = [
  {
    title: "Morning sync",
    body: "Duty roster confirmations, transport sweeps, and bursary reconciliations post to the live strip before 9 a.m.",
  },
  {
    title: "Learning hours",
    body: "Teachers upload quick scores, counsellors log interventions, and any welfare alert triggers colour-coded follow-up owners.",
  },
  {
    title: "Close of day",
    body: "Heads sign off on unresolved items; proprietors receive a single digest with finance, discipline, and logistics status.",
  },
];

const securityNotes = [
  {
    title: "Workspace-only sign in",
    body: "We honour NEXT_PUBLIC_GOOGLE_WORKSPACE_DOMAIN and block personal Gmail before a dashboard renders.",
  },
  {
    title: "Role-aware unlocks",
    body: "Organisational units map to School Suite modules, so bursary never sees counselling files and vice versa.",
  },
  {
    title: "Instant revoke",
    body: "Disable a staff member inside Google Admin and the cockpit signs them out immediately—no spare passwords lingering.",
  },
];

const activationChecklist = [
  "Verify your Workspace domain",
  "Whitelist the teams that need early access",
  "Import students and guardians via CSV or synced SIS",
  "Run a two-week parallel test using our rollout brief",
];

export default function LandingShowcase() {
  const { status, signInWithGoogle } = useAuth();
  const authenticating = status === "authenticating";

  const callToActionText = useMemo(
    () => (authenticating ? "Opening Google sign-in…" : "Continue with Google"),
    [authenticating],
  );

  return (
    <div className="space-y-16 pb-24">
      <header className="sticky top-4 z-10 mx-auto -mt-8 flex max-w-5xl items-center justify-between rounded-full border border-[var(--border)] bg-white/80 px-4 py-3 shadow-[0_20px_60px_-36px_rgba(17,16,20,0.65)] backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-white">BS</span>
          <div>
            <p className="text-sm font-semibold text-[var(--ink)]">Brand-Stone</p>
            <p className="text-xs text-[var(--slate-500)]">School Suite</p>
          </div>
        </div>
        <nav className="hidden items-center gap-4 text-sm font-medium text-[var(--slate-600)] sm:flex">
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className="rounded-full px-3 py-1 transition hover:text-[var(--brand-600)]">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={AUTH_SIGN_IN_PATH}
            className="hidden rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--slate-700)] transition hover:border-[var(--brand)]/40 hover:text-[var(--brand-600)] sm:inline-flex"
          >
            Rollout brief
          </Link>
          <button
            type="button"
            onClick={() => void signInWithGoogle()}
            disabled={authenticating}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(238,72,17,0.9)] transition hover:bg-[var(--brand-500)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[var(--brand-700)]">G</span>
            {callToActionText}
          </button>
        </div>
      </header>

      <section id="product" className="relative isolate overflow-hidden rounded-[48px] border border-[var(--border)] bg-white/90 px-6 py-14 shadow-[0_50px_120px_-70px_rgba(23,22,29,0.7)] sm:px-12">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-6 h-64 w-64 rounded-full bg-[var(--almond-haze)]/40 blur-[90px]" />
          <div className="absolute bottom-[-4rem] right-[-3rem] h-72 w-72 rounded-full bg-[var(--violet-glow)]/50 blur-[120px]" />
        </div>
        <div className="relative space-y-8 text-[var(--ink)]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--muted)]/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--slate-500)]">
            Nigerian school operations cockpit
          </div>
          <div className="space-y-4">
            <h1 className="font-display text-[clamp(2.4rem,4.4vw,3.8rem)] font-semibold leading-tight">
              A calmer landing page for a louder impact—School Suite keeps admissions, academics, finance, and care in one evidence-grade stream.
            </h1>
            <p className="text-base text-[var(--slate-600)] sm:text-lg">
              Built with Lagos and Abuja proprietors, the workspace brings the right signal at the right time. No tabs of spreadsheets; just a living strip of what changed and who is on it.
            </p>
          </div>
          <div className="grid gap-4 rounded-[36px] border border-white/60 bg-white/80 p-5 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-[var(--border)] bg-white/90 p-4 shadow-[0_15px_40px_-30px_rgba(23,22,29,0.7)]">
                <p className="text-xs uppercase tracking-[0.32em] text-[var(--slate-500)]">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
                <p className="text-sm text-[var(--slate-600)]">{stat.context}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {moduleShowcase.map((module) => (
              <div key={module.title} className="rounded-[28px] border border-[var(--border)] bg-white/90 p-5">
                <p className="text-sm font-semibold text-[var(--ink)]">{module.title}</p>
                <p className="mt-2 text-sm text-[var(--slate-600)]">{module.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="grid gap-8 rounded-[42px] border border-[var(--border)] bg-white/85 px-6 py-12 shadow-[0_40px_110px_-80px_rgba(15,23,42,0.35)] sm:grid-cols-[1.1fr,0.9fr] sm:px-12">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--slate-500)]">Security & trust</p>
          <h2 className="font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold text-[var(--ink)]">
            Google Workspace is the key, School Suite is the cockpit. Once domains match, the runway opens and privacy stays intact.
          </h2>
          <p className="text-sm text-[var(--slate-600)] sm:text-base">
            We lean on the guardrails your IT team already enforces. Nothing exotic—just strict domain checks, OU-based scopes, and live revocation.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {securityNotes.map((note) => (
              <div key={note.title} className="rounded-2xl border border-[var(--border)] bg-white/90 p-4">
                <p className="text-sm font-semibold text-[var(--ink)]">{note.title}</p>
                <p className="mt-1 text-sm text-[var(--slate-600)]">{note.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 rounded-[32px] border border-[var(--border)] bg-gradient-to-br from-[var(--violet-glow)]/25 via-white to-[var(--almond-haze)]/45 p-6 shadow-[0_30px_100px_-60px_rgba(23,22,29,0.55)]">
          <p className="text-xs uppercase tracking-[0.32em] text-[var(--slate-500)]">Activation steps</p>
          <ul className="space-y-3 text-sm text-[var(--slate-600)]">
            {activationChecklist.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand)]/15 text-xs font-semibold text-[var(--brand-600)]">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => void signInWithGoogle()}
            disabled={authenticating}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white shadow-[0_24px_60px_-30px_rgba(238,72,17,0.9)] transition hover:bg-[var(--brand-500)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {callToActionText}
          </button>
          <p className="text-xs text-[var(--slate-500)]">
            Verified accounts only—landing preview cards never show real learner data.
          </p>
        </div>
      </section>

      <section id="flows" className="rounded-[46px] border border-[var(--border)] bg-white px-6 py-12 shadow-[0_36px_120px_-72px_rgba(23,22,29,0.6)] sm:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--slate-500)]">Daily rhythm</p>
            <h2 className="font-display text-[clamp(1.9rem,3vw,2.4rem)] font-semibold text-[var(--ink)]">A playful, functional strip that keeps everyone aligned.</h2>
            <p className="mt-2 text-sm text-[var(--slate-600)] sm:text-base">
              We flattened the clutter so operators see what matters first. Each block is tappable, mobile-friendly, and colour-coded to reduce mental load.
            </p>
          </div>
          <Link
            href={AUTH_SIGN_IN_PATH}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] px-5 py-2 text-sm font-semibold text-[var(--slate-700)] transition hover:border-[var(--brand)]/40 hover:text-[var(--brand-600)]"
          >
            Download the quickstart
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {workflowMoments.map((moment) => (
            <div key={moment.title} className="relative overflow-hidden rounded-[30px] border border-[var(--border)] bg-white/90 p-5">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand)] via-[var(--salmon-500)] to-[var(--violet-glow)]" />
              <p className="mt-4 text-sm font-semibold text-[var(--ink)]">{moment.title}</p>
              <p className="mt-2 text-sm text-[var(--slate-600)]">{moment.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
