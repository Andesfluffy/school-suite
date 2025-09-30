"use client";

import React from "react";

export default function Select({ className = "", ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`rounded-md border border-white/15 bg-white/95 px-3 py-2 text-sm text-slate-900 shadow-[0_18px_36px_-28px_rgba(15,23,42,0.65)] outline-none transition placeholder:text-slate-400 focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)] ${className}`}
      {...props}
    />
  );
}
