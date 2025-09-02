"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function Tabs({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <div role="tablist" aria-label="Sections" className="relative flex gap-2 text-sm border-b border-white/10">
      {items.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            role="tab"
            aria-selected={active}
            className={`relative px-3 py-2 -mb-px transition-colors ${
              active ? "text-[var(--brand)]" : "text-white hover:text-[var(--brand)]"
            }`}
          >
            {t.label}
            {active ? (
              <motion.span
                layoutId="tabs-underline"
                className="absolute left-2 right-2 -bottom-[2px] h-[2px] bg-[var(--brand)]"
                aria-hidden
              />
            ) : null}
          </Link>
        );
      })}
    </div>
  );
}

