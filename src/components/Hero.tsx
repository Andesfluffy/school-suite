"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { AUTH_SIGN_IN_PATH } from "@/lib/routes";

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.3);
  const bg = useTransform([mx, my] as const, ([x, y]) => {
    const xPct = Math.round(Number(x ?? 0) * 100);
    const yPct = Math.round(Number(y ?? 0) * 100);
    return `radial-gradient(80rem 50rem at ${xPct}% ${yPct}%, rgba(217,4,41,0.24), transparent 60%)`;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mx.set(Math.max(0, Math.min(1, x)));
      my.set(Math.max(0, Math.min(1, y)));
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] text-white shadow-2xl backdrop-blur-sm p-8 md:p-12 min-h-[520px] grid md:grid-cols-2 items-center"
    >
      <motion.div aria-hidden className="absolute inset-0 z-0" style={{ background: bg }} />
      <div className="absolute inset-0 bg-grid opacity-[0.04] z-0" />

      <div className="relative z-10 max-w-2xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/60">
          <span className="h-2 w-2 rounded-full bg-[var(--brand)] shadow-[0_0_12px_rgba(217,4,41,0.8)]" aria-hidden />
          Accredited school release
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight"
        >
          Precision control for the
          <br />
          <span className="brand-text">modern school estate.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="text-white/70 max-w-prose text-base"
        >
          Login once as the school, unlock every workspace — students, staff, events, finance, and performance — with a glassy
          command centre tuned for audits, collaboration, and calm execution.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap gap-3"
        >
          <Link
            href={AUTH_SIGN_IN_PATH}
            className="rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[rgba(217,4,41,0.35)] transition hover:bg-[var(--brand-500)]"
          >
            School login · Google Workspace
          </Link>
          <Link
            href="#delivery"
            className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
          >
            Review implementation plan
          </Link>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="grid gap-3 pt-4 text-sm text-white/70 sm:grid-cols-2"
        >
          {["Unified dashboards", "Role-based audit trails", "Finance-grade exports", "Parent and staff communications"].map((point) => (
            <li key={point} className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[10px] font-semibold text-white">✓</span>
              {point}
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="relative z-10 hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-white/10 shadow-2xl photo-overlay"
        >
          <div className="absolute -top-16 -right-12 w-64 h-64 rounded-full accent-ring" />
          <Image
            src="/images/hero-lockers.jpg"
            alt="School hallway lockers"
            width={900}
            height={700}
            priority
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
