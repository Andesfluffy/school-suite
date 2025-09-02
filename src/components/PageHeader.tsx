export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="rounded-xl bg-gradient-to-r from-[var(--brand)]/12 to-transparent border p-5">
      <h1 className="font-display text-xl sm:text-2xl font-semibold">{title}</h1>
      {subtitle ? (
        <p className="text-sm text-white/70 mt-1 max-w-3xl">{subtitle}</p>
      ) : null}
    </div>
  );
}


