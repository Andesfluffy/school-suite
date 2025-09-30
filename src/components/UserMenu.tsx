"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "./AuthProvider";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" {...props}>
      <path
        fill="#EA4335"
        d="M12 10.2v3.84h5.39c-.24 1.27-.96 2.35-2.04 3.07l3.29 2.55c1.92-1.77 3.03-4.39 3.03-7.5 0-.72-.07-1.41-.2-2.07H12Z"
      />
      <path fill="#34A853" d="M6.53 14.32 5.5 15.1l-2.6 2.01C4.43 19.92 7.96 22 12 22c2.7 0 4.97-.89 6.63-2.41l-3.29-2.55c-.91.6-2.07.96-3.34.96-2.57 0-4.75-1.73-5.52-4.13Z" />
      <path fill="#4A90E2" d="M3 7.09A9.97 9.97 0 0 0 2 12c0 1.73.42 3.36 1.16 4.81 0 0 2.01-2.01 2.09-2.09C4.42 13.45 4.2 12.75 4.2 12c0-.78.21-1.52.58-2.18z" />
      <path
        fill="#FBBC05"
        d="M12 4.62c1.47 0 2.8.5 3.85 1.47l2.89-2.89C16.95 1.7 14.68.75 12 .75 7.96.75 4.43 2.83 2.9 5.89l3.29 2.55c.76-2.4 2.94-4.13 5.81-4.13Z"
      />
    </svg>
  );
}

function Spinner() {
  return <span className="h-4 w-4 animate-spin rounded-full border border-transparent border-t-[var(--brand)]" />;
}

export default function UserMenu() {
  const { status, user, signInWithGoogle, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const loading = status === "initializing" || status === "authenticating";

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, []);

  if (loading) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-600 shadow-sm">
        <Spinner />
        <span>Connecting…</span>
      </div>
    );
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={() => void signInWithGoogle()}
        className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-sm font-semibold text-neutral-800 shadow-sm transition hover:border-neutral-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
      >
        <GoogleIcon className="h-4 w-4" />
        School login
      </button>
    );
  }

  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase())
    .join("");

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-left text-sm text-neutral-800 shadow-sm transition hover:border-neutral-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--brand)] text-xs font-semibold uppercase text-white shadow-sm">
          {initials}
        </span>
        <span className="leading-tight">
          <span className="block text-xs uppercase tracking-wide text-neutral-500">School access</span>
          <span className="block max-w-[10rem] truncate font-medium text-neutral-900">{user.name}</span>
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-neutral-500 transition ${open ? "rotate-180" : "rotate-0"}`}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <path d="m5 7 5 6 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-60 rounded-xl border border-neutral-200 bg-white p-3 text-sm text-neutral-800 shadow-xl ring-1 ring-black/5"
        >
          <div className="mb-3 space-y-1">
            <p className="text-xs uppercase tracking-wide text-neutral-500">Google Workspace account</p>
            <p className="font-medium text-neutral-900">{user.name}</p>
            <p className="text-xs text-neutral-600">{user.email}</p>
          </div>
          <Link
            href="/students"
            className="block rounded-md bg-[var(--brand)] px-3 py-2 text-center font-semibold text-white transition hover:bg-[var(--brand-500)]"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            Open dashboard
          </Link>
          <button
            type="button"
            onClick={() => {
              void signOut();
              setOpen(false);
            }}
            className="mt-2 w-full rounded-md border border-neutral-200 px-3 py-2 text-neutral-600 transition hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-900"
            role="menuitem"
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}

