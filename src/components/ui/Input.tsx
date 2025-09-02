"use client";

import React from "react";

export default function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`border border-white/10 rounded-md px-3 py-2 text-sm outline-none bg-white/5 text-white placeholder-white/60 focus:ring-2 focus:ring-[var(--brand)] focus:border-[var(--brand)] transition ${className}`}
      {...props}
    />
  );
}
