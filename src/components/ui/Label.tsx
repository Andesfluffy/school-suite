"use client";

import React from "react";

export default function Label({ className = "", children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={`grid gap-1 text-sm ${className}`} {...props}>
      {children}
    </label>
  );
}

