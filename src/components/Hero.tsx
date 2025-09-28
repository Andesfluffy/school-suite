"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.3);
  const bg = useTransform([mx, my], ([x, y]) => {
    const xPct = Math.round(x * 100);
    const yPct = Math.round(y * 100);
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
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight"
        >
          Precision control for your
          <br />
          <span className="brand-text">entire school estate.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="text-white/70 max-w-prose text-base"
        >
          Every module — students, staff, events, finance, performance — lives inside one matte-black cockpit tuned for speed,
          focus, and audit-ready accuracy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap gap-3"
        >
          <Link
            href="/students"
            className="px-5 py-2.5 rounded-full bg-[var(--brand)] text-white shadow-lg shadow-[rgba(217,4,41,0.35)] transition hover:bg-[var(--brand-500)]"
          >
            Launch student hub
          </Link>
          <Link
            href="/auth/sign-in"
            className="px-5 py-2.5 rounded-full border border-white/20 text-white/80 transition hover:border-white/40 hover:text-white"
          >
            Sign in with Google
          </Link>
        </motion.div>
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
