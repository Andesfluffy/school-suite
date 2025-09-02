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
    return `radial-gradient(80rem 50rem at ${xPct}% ${yPct}%, rgba(124,58,237,0.18), transparent 60%)`;
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
      className="relative overflow-hidden rounded-2xl subtle-border bg-[#0b0f18] text-white p-8 md:p-12 shadow-sm min-h-[560px] grid md:grid-cols-2 items-center"
    >
      <motion.div aria-hidden className="absolute inset-0 z-0" style={{ background: bg }} />
      <div className="absolute inset-0 bg-grid opacity-[0.06] z-0" />

      <div className="relative z-10 max-w-2xl space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight"
        >
          Operate Your School
          <br />
          <span className="brand-text">Beautifully. Precisely.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="text-white/80 max-w-prose"
        >
          Students, staff, performance, events, and finance — unified in a
          fluid, high‑performance workspace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="flex flex-wrap gap-3"
        >
          <Link
            href="/students"
            className="px-5 py-2.5 rounded-md brand-gradient brand-gradient-animate text-white elev-1"
          >
            Get Started
          </Link>
          <Link
            href="/financials"
            className="px-5 py-2.5 rounded-md border border-white/20 text-white/90 hover:bg-white/5"
          >
            View Financials
          </Link>
        </motion.div>
      </div>

      <div className="relative z-10 hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto max-w-md overflow-hidden rounded-xl border border-white/10 shadow-2xl photo-overlay"
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
