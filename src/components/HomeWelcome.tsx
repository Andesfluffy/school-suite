"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useAuth } from "@/components/AuthProvider";

const snapshots = [
  { label: "Students on roll", value: "1,204", detail: "Synced 2 min ago" },
  { label: "Staff on duty", value: "148", detail: "HR roster confirmed" },
  { label: "Events this week", value: "12", detail: "All cover arranged" },
  { label: "Budget variance", value: "+3.4%", detail: "Quarter-to-date" },
  { label: "Open interventions", value: "18", detail: "Across 7 cohorts" },
  { label: "Transport status", value: "On schedule", detail: "9 routes live" },
];

export default function HomeWelcome() {
  const { user } = useAuth();
  const greetingName = useMemo(() => {
    if (!user?.name) return "Administrator";
    const [first] = user.name.split(" ");
    return first ?? "Administrator";
  }, [user?.name]);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]/95 p-8 text-white shadow-[0_32px_120px_-60px_rgba(217,4,41,0.6)] sm:p-10 lg:p-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(110rem_90rem_at_10%_20%,rgba(217,4,41,0.18),transparent)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#2a0008]/40 via-transparent to-transparent" aria-hidden />
      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
            <span className="h-2 w-2 rounded-full bg-[var(--brand)] shadow-[0_0_10px_rgba(217,4,41,0.8)]" aria-hidden />
            School control center
          </div>
          <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">Welcome back, {greetingName}.</h1>
          <p className="max-w-2xl text-sm text-white/70 sm:text-base">
            The Brand‑Stone home workspace keeps every team aligned. Jump into a module, review today&apos;s metrics, or surface an action without leaving this hub.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/students"
              className="rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-500)]"
            >
              View students
            </Link>
            <Link
              href="/events"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/40 hover:text-white"
            >
              Plan an event
            </Link>
          </div>
        </div>
        <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {snapshots.map((item) => (
            <div
              key={item.label}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-4 transition hover:border-[var(--brand)]/60 hover:shadow-[0_24px_60px_-35px_rgba(217,4,41,0.55)]"
            >
              <div className="text-[11px] uppercase tracking-[0.28em] text-white/45">{item.label}</div>
              <div className="mt-3 text-2xl font-semibold text-white">{item.value}</div>
              <div className="mt-1 text-xs text-white/60">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
