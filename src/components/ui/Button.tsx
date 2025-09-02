"use client";

import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

export default function Button({
  as: As = "button",
  variant = "primary",
  className = "",
  ...props
}: React.ComponentProps<any> & { as?: any; variant?: Variant }) {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none px-4 py-2 active:scale-[0.98]";
  const variants: Record<Variant, string> = {
    primary: "brand-gradient brand-gradient-animate text-white shadow-sm hover:opacity-95 focus:ring-[var(--brand)]",
    secondary: "border border-gray-300 bg-white hover:bg-gray-50 focus:ring-gray-300",
    ghost: "hover:bg-gray-100 dark:hover:bg-white/10",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
  };
  return <As className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
