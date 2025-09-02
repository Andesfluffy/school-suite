"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Item = { title: string; href: string; keywords?: string };

const ITEMS: Item[] = [
  { title: "Home", href: "/", keywords: "start dashboard" },
  { title: "Students", href: "/students", keywords: "student biodata academics" },
  { title: "Add Student", href: "/students/new", keywords: "create student" },
  { title: "Staff", href: "/staff", keywords: "staff roles salaries" },
  { title: "Add Staff", href: "/staff/new", keywords: "create staff" },
  { title: "Performance", href: "/performance", keywords: "attendance grades cgpa" },
  { title: "Events", href: "/events", keywords: "calendar" },
  { title: "Financials", href: "/financials", keywords: "income expenses" },
  { title: "Income", href: "/financials/income", keywords: "fees dues medicals sanctions" },
  { title: "Expenses", href: "/financials/expenses", keywords: "salaries utilities maintenance" },
  { title: "Financial Report", href: "/financials/report", keywords: "report print csv" },
];

function score(q: string, it: Item) {
  const hay = `${it.title} ${it.keywords || ""}`.toLowerCase();
  let s = 0;
  q.split(/\s+/).forEach((p) => {
    if (p && hay.includes(p.toLowerCase())) s += 1;
  });
  if (it.title.toLowerCase().startsWith(q.toLowerCase())) s += 2;
  return s;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    if (!q) return ITEMS.slice(0, 8);
    return [...ITEMS]
      .map((it) => ({ it, s: score(q, it) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((x) => x.it);
  }, [q]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-start justify-center p-4"
      onClick={() => setOpen(false)}
    >
      <div className="w-full max-w-xl rounded-lg border bg-white text-gray-900 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="border-b p-2">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search pages (Ctrl/Cmd + K)"
            className="w-full px-3 py-2 outline-none"
          />
        </div>
        <ul className="max-h-72 overflow-auto p-1">
          {results.length === 0 ? (
            <li className="p-3 text-sm text-gray-600">No results</li>
          ) : (
            results.map((r) => (
              <li key={r.href}>
                <Link href={r.href} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2 hover:bg-gray-100">
                  <div className="text-sm font-medium">{r.title}</div>
                  {r.keywords ? <div className="text-xs text-gray-600">{r.keywords}</div> : null}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

