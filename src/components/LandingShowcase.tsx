"use client";

import Link from "next/link";
import { useMemo } from "react";
import { AUTH_SIGN_IN_PATH } from "@/lib/routes";
import { useAuth } from "@/components/AuthProvider";

const featureHighlights = [
  {
    title: "Unified operations cockpit",
    description:
      "Students, staff, performance, finance, and events are linked to a single truth so leadership can act without juggling spreadsheets.",
  },
  {
    title: "Workspace-native security",
    description:
      "Google Workspace SSO is enforced through Firebase Auth, locking access to approved school domains and auto-revoking leavers.",
  },
  {
    title: "Role-tuned permissions",
    description:
      "Assign heads, bursars, counsellors, and transport leads scoped visibility so every team sees what they need—and nothing else.",
  },
];

const flowSteps = [
  {
    heading: "School domain handshake",
    body: "An administrator launches Google sign-in. Firebase validates the Workspace domain you register, ensuring only school tenants proceed.",
  },
  {
    heading: "Workspace token trusted",
    body: "Firebase exchanges the Google credential for a session token. Brand-Stone honours that token for every API call and audit trail event.",
  },
  {
    heading: "Staff identities branch",
    body: "Within a school workspace you invite faculty, bursars, and operations leads. Each staff account inherits the school token and their assigned role scope.",
  },
  {
    heading: "Always-on oversight",
    body: "When people depart, disable them in Workspace and the Firebase binding closes. No manual clean-up or stale access.",
  },
];

const staffRoles = [
  {
    label: "Academics",
    title: "Heads & tutors",
    blurb: "Lesson planning, attainment analytics, interventions, and student records sync live from the school workspace.",
  },
  {
    label: "Operations",
    title: "Transport & events",
    blurb: "Route rosters, cover requests, visitors, and trip risk assessments align under one operational timeline.",
  },
  {
    label: "Business",
    title: "Finance & HR",
    blurb: "Budget levers, payroll exports, inventory, and hiring flows inherit the same Google identity, so audits stay effortless.",
  },
];

export default function LandingShowcase() {
  const { status, signInWithGoogle } = useAuth();
  const authenticating = status === "authenticating";

  const callToActionText = useMemo(
    () => (authenticating ? "Opening Google Workspace…" : "Launch school login"),
    [authenticating],
  );

  return (
    <div className="space-y-20 pb-24">
      <section className="relative overflow-hidden rounded-4xl border border-[var(--border)] bg-white px-6 py-16 shadow-[0_24px_70px_-38px_rgba(13,191,154,0.25)] sm:px-10 sm:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[var(--brand)]/12 blur-3xl" />
          <div className="absolute right-[-6rem] top-6 h-64 w-64 rounded-full bg-[#d9fff2] blur-3xl" />
        </div>
        <div className="relative mx-auto flex max-w-5xl flex-col gap-12 text-[var(--ink)]">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 py-1 text-xs uppercase tracking-[0.28em] text-[var(--slate-500)]">
            <span className="h-2 w-2 rounded-full bg-[var(--brand)] shadow-[0_0_0_6px_rgba(13,191,154,0.12)]" aria-hidden />
            Brand-Stone school suite
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div className="space-y-6">
              <h1 className="font-display text-[clamp(2.4rem,4.4vw,3.6rem)] font-semibold leading-tight text-[var(--ink)]">
                A calm, mint-forward control room for every school leader.
              </h1>
              <p className="text-base text-[var(--slate-600)] sm:text-lg">
                Replace patchwork spreadsheets with a clean, Workspace-trusted suite. Admissions, safeguarding, finance, and operations now breathe inside one elegant, mint-and-white canvas built for clarity.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => void signInWithGoogle()}
                  disabled={authenticating}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-26px_rgba(13,191,154,0.9)] transition hover:bg-[var(--brand-500)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[var(--brand-700)]">
                    G
                  </span>
                  {callToActionText}
                </button>
                <Link
                  href={AUTH_SIGN_IN_PATH}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--slate-700)] shadow-sm transition hover:border-[var(--brand)]/50 hover:text-[var(--brand-600)]"
                >
                  Explore access controls
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {featureHighlights.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-[var(--border)] bg-white/80 p-5 shadow-[0_18px_70px_-52px_rgba(13,191,154,0.6)]"
                  >
                    <h2 className="text-base font-semibold text-[var(--ink)]">{feature.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--slate-600)]">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[#f2fffa] via-white to-[#e4f8f1] p-6 shadow-inner">
              <div className="absolute left-8 top-6 h-24 w-24 rounded-full bg-[var(--brand)]/10 blur-2xl" aria-hidden />
              <div className="absolute right-8 bottom-8 h-20 w-20 rounded-full bg-[#c7f5e6]/50 blur-xl" aria-hidden />
              <div className="relative space-y-4 rounded-2xl bg-white p-5 shadow-[0_18px_80px_-48px_rgba(13,191,154,0.8)]">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--slate-500)]">Workspace-trusted</p>
                <p className="text-sm leading-relaxed text-[var(--slate-600)]">
                  Firebase Admin validates every Google Workspace credential before your team even sees the dashboard. Sessions remain server-side, and cookies are scoped to your verified school domain.
                </p>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/70 p-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-[var(--slate-600)]">
                    <span>Access status</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--brand)]/15 px-2 py-1 text-[var(--brand-700)]">Secure</span>
                  </div>
                  <div className="mt-3 space-y-2 text-sm text-[var(--slate-600)]">
                    <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" aria-hidden /> SSO enforced for school domains</p>
                    <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" aria-hidden /> Tokens verified by Firebase Admin</p>
                    <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" aria-hidden /> Audit-ready session trail</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 rounded-4xl border border-[var(--border)] bg-white/80 px-6 py-14 shadow-[0_18px_60px_-42px_rgba(15,23,42,0.18)] sm:grid-cols-[1.1fr,1fr] sm:px-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 py-1 text-xs uppercase tracking-[0.28em] text-[var(--slate-500)]">
            Flow spotlight
          </div>
          <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-semibold text-[var(--ink)]">
            How Google sign-in cascades through your school.
          </h2>
          <p className="text-sm text-[var(--slate-600)] sm:text-base">
            Brand-Stone pairs Firebase Auth with Workspace so you can invite leadership, staff, and specialists without separate passwords. Everything honours the domain you register at onboarding.
          </p>
          <div className="mt-4 space-y-5">
            {flowSteps.map((step, index) => (
              <div key={step.heading} className="relative rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm">
                <div className="absolute -left-4 top-5 hidden h-2 w-2 rounded-full bg-[var(--brand)] shadow-[0_0_0_8px_rgba(13,191,154,0.15)] sm:block" aria-hidden />
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--muted)] text-sm font-semibold text-[var(--brand-700)]">
                    {index + 1}
                  </span>
                  <h3 className="text-base font-semibold text-[var(--ink)]">{step.heading}</h3>
                </div>
                <p className="mt-3 text-sm text-[var(--slate-600)]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[#f2fffa] via-white to-[#e3f5ee] p-6 shadow-[0_20px_60px_-48px_rgba(13,191,154,0.55)]">
            <h3 className="font-display text-xl font-semibold text-[var(--ink)]">Admin quick brief</h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--slate-600)]">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--muted)] text-[10px] text-[var(--brand-700)]">✓</span>
                Register your Firebase project keys in <code className="rounded bg-[var(--muted)] px-1.5 py-0.5 text-xs">.env.local</code>.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--muted)] text-[10px] text-[var(--brand-700)]">✓</span>
                Restrict Google Workspace domains with <code className="rounded bg-[var(--muted)] px-1.5 py-0.5 text-xs">NEXT_PUBLIC_GOOGLE_WORKSPACE_DOMAIN</code>.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--muted)] text-[10px] text-[var(--brand-700)]">✓</span>
                Invite staff from the dashboard once your tenancy is verified.
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-[var(--border)] bg-white p-6 text-sm text-[var(--slate-600)] shadow-sm">
            <p className="font-semibold uppercase tracking-[0.28em] text-[var(--slate-500)]">Trust centre</p>
            <p className="mt-3">
              Firebase Auth issues session tokens stored with browser-managed security. Brand-Stone never stores passwords; access follows Google&apos;s revocation timeline automatically.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-4xl border border-[var(--border)] bg-white px-6 py-14 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.2)] sm:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 py-1 text-xs uppercase tracking-[0.28em] text-[var(--slate-500)]">
              Staff experience
            </div>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold text-[var(--ink)]">
              Every staff login inherits the school&apos;s verified backbone.
            </h2>
            <p className="text-sm text-[var(--slate-600)] sm:text-base">
              Once a school admin authenticates, staff invites branch under the same Firebase project. Roles can be tuned per campus, faculty, or trust so individuals land exactly where they should.
            </p>
          </div>
          <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {staffRoles.map((role) => (
              <div key={role.title} className="rounded-2xl border border-[var(--border)] bg-white p-5 text-[var(--slate-600)] shadow-[0_18px_40px_-32px_rgba(13,191,154,0.45)]">
                <p className="text-xs uppercase tracking-[0.32em] text-[var(--slate-500)]">{role.label}</p>
                <h3 className="mt-3 text-lg font-semibold text-[var(--ink)]">{role.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{role.blurb}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[#e4f8f1] via-white to-[#f2fffa] p-6 text-[var(--slate-700)] shadow-[0_18px_70px_-46px_rgba(13,191,154,0.55)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[var(--slate-500)]">Ready to brief your school?</p>
              <h3 className="font-display text-2xl font-semibold text-[var(--ink)]">Launch the secure Workspace sign-on now.</h3>
            </div>
            <button
              type="button"
              onClick={() => void signInWithGoogle()}
              disabled={authenticating}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand)] bg-[var(--brand)] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_16px_40px_-28px_rgba(13,191,154,0.8)] transition hover:bg-[var(--brand-500)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {callToActionText}
            </button>
          </div>
          <p className="text-xs text-[var(--slate-600)]">
            Need a sandbox? Provision a secondary Firebase project, whitelist a demo Workspace domain, and the suite mirrors production behaviour without mixing records.
          </p>
        </div>
      </section>
    </div>
  );
}
