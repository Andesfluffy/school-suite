"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "light" | "dark" | "system";

export default function ThemeMenu() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("system");
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = (localStorage.getItem("theme-mode") as Mode) || "system";
    applyMode(saved);
    setMode(saved);
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const applyMode = (m: Mode) => {
    if (m === "system") {
      localStorage.setItem("theme-mode", "system");
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    } else {
      localStorage.setItem("theme-mode", m);
      document.documentElement.setAttribute("data-theme", m);
    }
  };

  const choose = (m: Mode) => {
    setMode(m);
    applyMode(m);
    setOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-md border border-white/20 px-2.5 py-1.5 text-white md:text-sm text-xs"
        title="Theme"
      >
        <span className="hidden sm:inline">{mode === "system" ? "System" : mode === "dark" ? "Dark" : "Light"}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {open ? (
        <div role="menu" className="absolute right-0 mt-2 w-40 rounded-lg border border-white/10 bg-[#0b0b0b]/95 text-white shadow-xl">
          {([
            { k: "light", label: "Light" },
            { k: "dark", label: "Dark" },
            { k: "system", label: "System" },
          ] as { k: Mode; label: string }[]).map((o) => (
            <button
              key={o.k}
              role="menuitemradio"
              aria-checked={mode === o.k}
              onClick={() => choose(o.k)}
              className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-white/10 ${mode === o.k ? "text-[var(--brand)]" : ""}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

