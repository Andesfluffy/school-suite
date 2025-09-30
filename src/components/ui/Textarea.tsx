"use client";

import React from "react";

export default function Textarea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`min-h-[120px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/60 outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)] ${className}`}
      {...props}
    />
  );
}
