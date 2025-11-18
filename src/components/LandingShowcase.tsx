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
    <div className="space-y-24 pb-24">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#090909]/95 px-6 py-16 sm:px-10 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120rem_90rem_at_30%_-20%,rgba(217,4,41,0.25),transparent)]"
        />
        <div className="relative mx-auto flex max-w-4xl flex-col gap-10 text-white">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
            <span className="h-2 w-2 rounded-full bg-[var(--brand)] shadow-[0_0_10px_rgba(217,4,41,0.8)]" aria-hidden />
            Brand-Stone school suite
          </div>
          <div className="space-y-6">
            <h1 className="font-display text-[clamp(2.2rem,4.2vw,3.4rem)] font-semibold leading-tight">
              The matte-black workspace built for confident school operations.
            </h1>
            <p className="text-base text-white/70 sm:text-lg">
              Introduce your leadership team to a cockpit that narrates the entire school day—from enrolment and staff rosters to finance levers and safeguarding actions.
              Authentication is anchored in Firebase so only verified Google Workspace tenants gain entry.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => void signInWithGoogle()}
              disabled={authenticating}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-500)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                G
              </span>
              {callToActionText}
            </button>
            <Link
              href={AUTH_SIGN_IN_PATH}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
            >
              Explore access controls
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {featureHighlights.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-black/40 p-5 text-white/70 shadow-[0_24px_120px_-70px_rgba(217,4,41,0.7)]"
              >
                <h2 className="text-base font-semibold text-white">{feature.title}</h2>
                <p className="mt-2 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-10 rounded-3xl border border-white/10 bg-[#0b0b0b]/95 px-6 py-14 sm:grid-cols-[1.1fr,1fr] sm:px-10">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/55">
            Flow spotlight
          </div>
          <h2 className="font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold text-white">
            How school sign-in fans out to every team member.
          </h2>
          <p className="text-sm text-white/70 sm:text-base">
            Brand-Stone links Firebase Auth with your Workspace roster. Administrators establish the school tenancy; individual staff simply accept their role invite and continue using their Google identity.
          </p>
          <div className="mt-6 space-y-6">
            {flowSteps.map((step, index) => (
              <div key={step.heading} className="relative rounded-xl border border-white/10 bg-black/40 p-5">
                <div className="absolute -left-4 top-5 hidden h-2 w-2 rounded-full bg-[var(--brand)] shadow-[0_0_10px_rgba(217,4,41,0.7)] sm:block" aria-hidden />
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 font-semibold text-white/70">
                    {index + 1}
                  </span>
                  <h3 className="text-base font-semibold text-white">{step.heading}</h3>
                </div>
                <p className="mt-3 text-sm text-white/70">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-black/60 via-black/40 to-[var(--brand)]/15 p-6 text-white/70">
            <h3 className="font-display text-xl font-semibold text-white">Admin quick brief</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/30 text-[10px] text-white">✓</span>
                Register your Firebase project keys in <code className="rounded bg-black/40 px-1.5 py-0.5 text-xs text-white/80">.env.local</code>.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/30 text-[10px] text-white">✓</span>
                Restrict Google Workspace domains with <code className="rounded bg-black/40 px-1.5 py-0.5 text-xs text-white/80">NEXT_PUBLIC_GOOGLE_WORKSPACE_DOMAIN</code>.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/30 text-[10px] text-white">✓</span>
                Invite staff from the dashboard once your tenancy is verified.
              </li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 text-sm text-white/70">
            <p className="font-semibold uppercase tracking-[0.28em] text-white/45">Trust centre</p>
            <p className="mt-3">
              Firebase Auth issues session tokens stored with browser-managed security. Brand-Stone never stores passwords; access follows Google&apos;s revocation timeline automatically.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#090909]/95 px-6 py-14 sm:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/55">
              Staff experience
            </div>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold text-white">
              Every staff login inherits the school&apos;s verified backbone.
            </h2>
            <p className="text-sm text-white/70 sm:text-base">
              Once a school admin authenticates, staff invites branch under the same Firebase project. Roles can be tuned per campus, faculty, or trust so individuals land exactly where they should.
            </p>
          </div>
          <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {staffRoles.map((role) => (
              <div key={role.title} className="rounded-2xl border border-white/10 bg-black/40 p-5 text-white/70">
                <p className="text-xs uppercase tracking-[0.32em] text-white/45">{role.label}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{role.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{role.blurb}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--brand)]/20 via-black/20 to-black/60 p-6 text-white">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-white/60">Ready to brief your school?</p>
              <h3 className="font-display text-2xl font-semibold">Launch the secure Workspace sign-on now.</h3>
            </div>
            <button
              type="button"
              onClick={() => void signInWithGoogle()}
              disabled={authenticating}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {callToActionText}
            </button>
          </div>
          <p className="text-xs text-white/70">
            Need a sandbox? Provision a secondary Firebase project, whitelist a demo Workspace domain, and the suite mirrors production behaviour without mixing records.
          </p>
        </div>
      </section>
    </div>
  );
}
