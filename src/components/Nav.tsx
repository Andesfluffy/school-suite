"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useAuth } from "./AuthProvider";
import UserMenu from "./UserMenu";

const links = [
  { href: "/", label: "Home" },
  { href: "/students", label: "Students" },
  { href: "/staff", label: "Staff" },
  { href: "/performance", label: "Performance" },
  { href: "/library", label: "E-Library" },
  { href: "/question-bank", label: "Question bank" },
  { href: "/events", label: "Events" },
  { href: "/financials", label: "Financials" },
  { href: "/payroll", label: "Payroll" },
];

export default function Nav() {
  const pathname = usePathname();
  const { session } = useAuth();
  const school = session?.school;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [spot, setSpot] = useState<{ x: number; y: number; w: number; visible: boolean }>({ x: 0, y: 0, w: 140, visible: false });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)]/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Go to homepage"
          className="group flex min-w-0 items-center gap-3 rounded-full px-2.5 py-1.5 text-[var(--ink)] transition hover:bg-[var(--muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/50"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Brand-Stone logo" className="h-9 w-9 rounded-full border border-[var(--border)] bg-white p-1 shadow-sm" />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-semibold tracking-tight text-[var(--ink)]">Brand-Stone</span>
            <span className="text-xs font-medium text-[var(--slate-500)]">School Suite</span>
          </div>
        </Link>

        {school ? (
          <div className="hidden min-w-0 flex-1 flex-col md:flex">
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50">Active school</span>
            <span className="truncate text-sm font-medium text-white">{school.name}</span>
          </div>
        ) : (
          <div className="hidden flex-1 md:flex" />
        )}

        <div
          className="relative hidden flex-1 justify-center md:flex"
          ref={wrapRef}
          onMouseLeave={() => setSpot((s) => ({ ...s, visible: false }))}
        >
          <nav className="flex items-center gap-6 text-sm text-[var(--slate-600)]">
            <motion.span
              className="nav-spot"
              animate={{ left: spot.x - spot.w / 2, top: spot.y - 18, width: spot.w, opacity: spot.visible ? 1 : 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <div
                  key={l.href}
                  className="relative pb-1"
                  onMouseEnter={(e) => {
                    const wrap = wrapRef.current;
                    if (!wrap) return;
                    const rWrap = wrap.getBoundingClientRect();
                    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                    setSpot({ x: r.left - rWrap.left + r.width / 2, y: r.top - rWrap.top + r.height / 2, w: Math.max(120, r.width + 24), visible: true });
                  }}
                >
                  <Link href={l.href} className={`transition-colors ${active ? "text-[var(--ink)]" : "hover:text-[var(--ink)]"}`}>
                    {l.label}
                  </Link>
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full underline-shimmer"
                    />
                  ) : null}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white text-[var(--ink)] shadow-sm transition hover:border-[var(--brand)]/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </button>
          <div className="shrink-0">
            <UserMenu />
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="border-t border-[var(--border)] bg-white/95 text-sm text-[var(--slate-700)] md:hidden"
          >
            <div className="space-y-4 px-4 py-4">
              {school ? (
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)]/70 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--slate-500)]">Active school</p>
                  <p className="mt-1 text-sm font-medium text-[var(--ink)]">{school.name}</p>
                  {school.domain ? <p className="text-xs text-[var(--slate-500)]">@{school.domain}</p> : null}
                </div>
              ) : null}
              <div className="grid gap-1">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-3 py-2 font-medium transition ${
                      isActive(l.href)
                        ? "bg-[var(--brand)] text-white shadow-[0_15px_40px_-32px_rgba(13,191,154,0.65)]"
                        : "text-[var(--slate-700)] hover:bg-[var(--muted)]"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
