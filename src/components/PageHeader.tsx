export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b]/90 p-6 sm:p-7">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--brand)]/20 via-transparent to-transparent opacity-80" aria-hidden />
      <div className="relative space-y-2">
        <h1 className="font-display text-xl sm:text-2xl font-semibold text-white">{title}</h1>
        {subtitle ? <p className="max-w-3xl text-sm text-white/70 leading-relaxed">{subtitle}</p> : null}
      </div>
    </div>
  );
}


