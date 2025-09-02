"use client";

export default function PrintButton({ label = "Print" }: { label?: string }) {
  return (
    <button onClick={() => window.print()} className="rounded border px-3 py-1 text-sm">{label}</button>
  );
}

