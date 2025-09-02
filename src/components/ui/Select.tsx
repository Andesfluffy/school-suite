"use client";

import React from "react";

export default function Select({ className = "", ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-[var(--brand)] transition ${className}`}
      {...props}
    />
  );
}
