import React from "react";

export default function Badge({ color = "gray", children }: { color?: "gray" | "green" | "red" | "blue"; children: React.ReactNode }) {
  const map = {
    gray: "bg-white/10 text-white border-white/20",
    green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    red: "bg-rose-500/15 text-rose-300 border-rose-500/25",
    blue: "bg-sky-500/15 text-sky-300 border-sky-500/25",
  } as const;
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${map[color]}`}>{children}</span>;
}
