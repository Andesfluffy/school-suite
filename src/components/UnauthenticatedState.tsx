import Link from "next/link";
import { AUTH_SIGN_IN_PATH } from "@/lib/routes";

export default function UnauthenticatedState({
  section,
  blurb,
}: {
  section: string;
  blurb?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#090909]/95 p-8 sm:p-10">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1b2d24]/40 via-transparent to-transparent"
        aria-hidden
      />
      <div className="relative max-w-2xl space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/55">
          <span className="h-2 w-2 rounded-full bg-[var(--brand)] shadow-[0_0_10px_rgba(var(--brand-rgb),0.8)]" aria-hidden />
          Restricted workspace
        </div>
        <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold text-white">School login required</h2>
        <p className="text-sm text-white/70">
          {blurb ?? `Authenticate with your Google Workspace identity to open the ${section}.`}
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link
            href={AUTH_SIGN_IN_PATH}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-500)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-500)]"
          >
            Launch school login
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
          >
            Return to landing
          </Link>
        </div>
        <ul className="grid gap-2 text-xs text-white/50 sm:grid-cols-2">
          {["Audit trail ready", "Role-based permissions", "Secure local storage", "Demo resets anytime"].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/20 text-[9px] text-white">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
