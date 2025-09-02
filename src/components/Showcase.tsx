"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Showcase() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -120]);
  return (
    <section ref={ref} className="mt-14">
      <div className="gradient-line animate" />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <Reveal>
          <div className="space-y-4">
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold text-white">All-in-one control center</h2>
            <p className="text-white/70">A clean dashboard for students, staff, performance, and finances - built to be fast, responsive, and delightful to use.</p>
            <ul className="text-sm text-white/70 list-disc pl-5 space-y-1">
              <li>Instant search and filters</li>
              <li>Inline edits and quick actions</li>
              <li>Export, print, and reports</li>
            </ul>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#0c1322] photo-overlay">
            <motion.div style={{ y: ySlow }}>
              <Image src="/images/showcase-classroom.jpg" alt="Classroom overview" width={1200} height={700} className="w-full h-auto object-cover" />
            </motion.div>
            <motion.div style={{ y: yFast }} className="pointer-events-none absolute -right-10 -top-10 w-80 h-80 rounded-full accent-ring" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
