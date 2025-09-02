export default function Stats() {
  const items = [
    { value: "25k+", label: "Records managed" },
    { value: "98%", label: "Uptime" },
    { value: "<200ms", label: "Avg. response" },
    { value: "A+", label: "Accessibility" },
  ];
  return (
    <section className="mt-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <div className="text-2xl font-semibold text-[var(--brand)]">{s.value}</div>
            <div className="text-xs text-white/70">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}


