export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/5 px-6 py-6 shadow-[0_30px_70px_-50px_rgba(15,23,42,0.95)] sm:px-8 sm:py-8">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--brand)]/18 via-transparent to-transparent" aria-hidden />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[var(--brand)]/10 blur-3xl" aria-hidden />
      <div className="relative space-y-3">
        <div className="h-[3px] w-14 rounded-full bg-gradient-to-r from-[var(--brand)] to-transparent" />
        <h1 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h1>
        {subtitle ? <p className="max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">{subtitle}</p> : null}
      </div>
    </div>
  );
}


