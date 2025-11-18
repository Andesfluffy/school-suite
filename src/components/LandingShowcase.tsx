"use client";

import Link from "next/link";
import { useMemo } from "react";
import { AUTH_SIGN_IN_PATH } from "@/lib/routes";
import { useAuth } from "@/components/AuthProvider";

const capabilityTiles = [
  {
    title: "Student & family records",
    body: "Enrollment, guardians, medical flags, and safeguarding notes stay connected to every timetable and communication.",
  },
  {
    title: "Attendance & behaviour",
    body: "Daily registers, follow-up queues, detentions, and pastoral trends roll into a single dashboard for heads of year.",
  },
  {
    title: "Billing & activities",
    body: "Fees, trips, transport passes, and meal plans reconcile against the same learner profile—no double entry or exports.",
  },
  {
    title: "Operations timeline",
    body: "Cover requests, room changes, visitor logs, and incident response live on one chronological feed for admin staff.",
  },
];

const accessSteps = [
  {
    label: "1. Sign in with Google",
    detail: "We only allow verified school Google Workspace accounts. Personal Gmail addresses are blocked by policy.",
  },
  {
    label: "2. Domain check",
    detail: "Firebase enforces the domain you whitelist. Any mismatch ends the session before data is loaded.",
  },
  {
    label: "3. Role-scoped access",
    detail: "Admins, bursars, teachers, and support staff only see the areas tied to their role and campus assignment.",
  },
  {
    label: "4. Ongoing control",
    detail: "Disabling a user in Workspace revokes School Suite access instantly—no separate passwords to chase.",
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
    <div className="space-y-16 pb-24">
      <section className="relative overflow-hidden rounded-4xl border border-[var(--border)] bg-white px-6 py-14 shadow-[0_24px_70px_-38px_rgba(13,191,154,0.25)] sm:px-10 sm:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-24 h-60 w-60 rounded-full bg-[var(--brand)]/12 blur-3xl" />
          <div className="absolute right-[-5rem] top-10 h-56 w-56 rounded-full bg-[#d9fff2] blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 text-[var(--ink)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 py-1 text-xs uppercase tracking-[0.28em] text-[var(--slate-500)]">
              <span className="h-2 w-2 rounded-full bg-[var(--brand)] shadow-[0_0_0_6px_rgba(13,191,154,0.12)]" aria-hidden />
              School Suite
            </div>
            <div className="space-y-3">
              <h1 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-tight">
                The consolidated home for school records, finance, and day-to-day coordination.
              </h1>
              <p className="text-base text-[var(--slate-600)] sm:text-lg">
                Keep admissions, attendance, billing, and transport aligned with the people who run them. School Suite gives leaders one symmetrical view of what is happening today and what needs action next.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={() => void signInWithGoogle()}
                disabled={authenticating}
                className="inline-flex min-w-[220px] items-center justify-center gap-2 rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-26px_rgba(13,191,154,0.9)] transition hover:bg-[var(--brand-500)] disabled:cursor-not-allowed disabled:opacity-60"
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
                Review access policy
                <span aria-hidden>→</span>
              </Link>
            </div>
            <p className="text-sm text-[var(--slate-500)]">
              You must sign in with your school&apos;s Google Workspace account before any dashboards or records become available.
            </p>
          </div>

          <div className="space-y-4 rounded-3xl border border-[var(--border)] bg-white/80 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.15)] backdrop-blur-sm">
            <div className="flex items-center justify-between rounded-2xl bg-[var(--muted)] px-4 py-3 text-[var(--slate-700)]">
              <p className="text-sm font-semibold">Today at a glance</p>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--brand-700)]">Live</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--slate-500)]">Admissions</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--ink)]">42</p>
                <p className="text-sm text-[var(--slate-500)]">New applicants awaiting document checks.</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--slate-500)]">Attendance</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--ink)]">96%</p>
                <p className="text-sm text-[var(--slate-500)]">Late arrivals highlighted for tutor follow-up.</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--slate-500)]">Billing</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--ink)]">$18.4k</p>
                <p className="text-sm text-[var(--slate-500)]">Outstanding fees with payment plans attached.</p>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--slate-500)]">Operations</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--ink)]">9</p>
                <p className="text-sm text-[var(--slate-500)]">Trips, cover, and transport tasks due today.</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-r from-[#e9f8f2] via-white to-[#e1f3ec] p-4">
              <p className="text-sm font-semibold text-[var(--ink)]">Symmetry by design</p>
              <p className="mt-2 text-sm text-[var(--slate-600)]">
                Leadership and staff see the same structured sections—records, daily tasks, finance, and communications—mirrored across desktop and mobile layouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-4xl border border-[var(--border)] bg-white/80 px-6 py-12 shadow-[0_18px_60px_-42px_rgba(15,23,42,0.18)] sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--slate-500)]">What you can manage</p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold text-[var(--ink)]">Everything needed to run a school stays orderly.</h2>
          </div>
          <Link
            href={AUTH_SIGN_IN_PATH}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--slate-700)] shadow-sm transition hover:border-[var(--brand)]/50 hover:text-[var(--brand-600)]"
          >
            See Google access rules
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilityTiles.map((tile) => (
            <div key={tile.title} className="h-full rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_16px_40px_-36px_rgba(13,191,154,0.35)]">
              <h3 className="text-lg font-semibold text-[var(--ink)]">{tile.title}</h3>
              <p className="mt-2 text-sm text-[var(--slate-600)]">{tile.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-4xl border border-[var(--border)] bg-white px-6 py-12 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.2)] sm:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 py-1 text-xs uppercase tracking-[0.28em] text-[var(--slate-500)]">
              Google-first access
            </div>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold text-[var(--ink)]">Sign in with Google before any workspace opens.</h2>
            <p className="text-sm text-[var(--slate-600)] sm:text-base">
              School Suite is gated by Google Workspace SSO. It keeps family data, financial information, and safeguarding notes off-limits until the right domain and role are confirmed.
            </p>
            <div className="mt-4 space-y-3">
              {accessSteps.map((step) => (
                <div key={step.label} className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-[var(--ink)]">{step.label}</p>
                  <p className="mt-1 text-sm text-[var(--slate-600)]">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[#e4f8f1] via-white to-[#f2fffa] p-6 text-[var(--slate-700)] shadow-[0_18px_70px_-46px_rgba(13,191,154,0.55)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[var(--slate-500)]">Secure entry</p>
                <h3 className="font-display text-xl font-semibold text-[var(--ink)]">Use Google to open the suite.</h3>
              </div>
              <button
                type="button"
                onClick={() => void signInWithGoogle()}
                disabled={authenticating}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand)] bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_40px_-28px_rgba(13,191,154,0.8)] transition hover:bg-[var(--brand-500)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {callToActionText}
              </button>
            </div>
            <p className="text-sm">
              When your session starts, dashboards, registers, billing tools, and transport workflows unlock in an orderly left-to-right layout so every header and navigation item lines up for leaders and staff alike.
            </p>
            <p className="text-xs text-[var(--slate-600)]">
              Have a demo domain? Whitelist it in <code className="rounded bg-[var(--muted)] px-1.5 py-0.5 text-xs">NEXT_PUBLIC_GOOGLE_WORKSPACE_DOMAIN</code> and the sign-in flow mirrors production without exposing real data.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
