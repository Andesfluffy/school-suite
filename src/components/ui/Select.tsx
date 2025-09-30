"use client";

import React from "react";

export default function Select({ className = "", ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`rounded-lg border border-neutral-200/80 bg-white px-3 py-2 text-sm text-neutral-800 shadow-sm outline-none transition placeholder:text-neutral-400 focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/50 ${className}`}
      {...props}
    />
  );
}
