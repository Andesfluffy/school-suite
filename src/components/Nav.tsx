"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/students", label: "Students" },
  { href: "/staff", label: "Staff" },
  { href: "/performance", label: "Performance" },
  { href: "/events", label: "Events" },
  { href: "/financials", label: "Financials" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [spot, setSpot] = useState<{ x: number; y: number; w: number; visible: boolean }>({ x: 0, y: 0, w: 140, visible: false });
  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <div className="relative" ref={wrapRef} onMouseLeave={() => setSpot((s) => ({ ...s, visible: false }))}>
      {/* Desktop nav */}
      <nav className="hidden md:flex gap-5 text-sm items-center relative">
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
              <Link
                href={l.href}
                className={`transition-colors ${active ? "text-white" : "text-white/80 hover:text-white"}`}
              >
                {l.label}
              </Link>
              {active ? (
                <motion.span layoutId="nav-underline" className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full underline-shimmer" />
              ) : null}
            </div>
          );
        })}
      </nav>

      {/* Mobile nav */}
      <button
        className="md:hidden inline-flex items-center justify-center rounded-md border border-white/20 px-2.5 py-1.5 text-white"
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {open ? (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-white/10 bg-[#0b0b0b]/95 p-2 shadow-xl md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm ${isActive(l.href) ? "bg-[var(--brand)] text-white" : "text-white hover:bg-white/10"}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
