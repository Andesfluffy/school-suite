"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function TopProgress() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "1";
    el.style.transform = "scaleX(0)";
    // Kick off progress
    requestAnimationFrame(() => {
      el.style.transform = "scaleX(1)";
    });
    const t = setTimeout(() => {
      el.style.opacity = "0";
    }, 300);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div
      aria-hidden
      ref={ref}
      className="fixed top-0 left-0 right-0 h-0.5 origin-left bg-[var(--brand)] z-[60]"
      style={{ transition: "transform 300ms ease-out, opacity 200ms ease-out", transform: "scaleX(0)", opacity: 0 }}
    />
  );
}

