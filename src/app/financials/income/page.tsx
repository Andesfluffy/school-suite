import Link from "next/link";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";
import { listFinancialEntries } from "../actions";

const categoryOptions = [
  "fees",
  "dues",
  "medical",
  "sanctions",
  "grants",
  "donations",
  "trade_fare",
] as const;

const statusOptions = ["paid", "outstanding", "waived"] as const;

function formatLabel(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function statusTone(status?: string | null) {
  switch (status) {
    case "paid":
      return "green" as const;
    case "outstanding":
      return "red" as const;
    case "waived":
      return "blue" as const;
    default:
      return "gray" as const;
  }
}

export default async function IncomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = (searchParams.category as string) || "";
  const status = (searchParams.status as string) || "";
  const from = (searchParams.from as string) || "";
  const to = (searchParams.to as string) || "";

  const entries = await listFinancialEntries("income", {
    category: category || undefined,
    status: status || undefined,
    from: from || undefined,
    to: to || undefined,
  });

  const total = entries.reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const outstanding = entries
    .filter((entry) => entry.status === "outstanding")
    .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const byCategory = entries.reduce<Record<string, number>>((acc, entry) => {
    const key = entry.category as string;
    acc[key] = (acc[key] || 0) + Number(entry.amount || 0);
    return acc;
  }, {});
  const statusBreakdown = entries.reduce<Record<string, number>>((acc, entry) => {
    const key = entry.status || "unassigned";
    acc[key] = (acc[key] || 0) + Number(entry.amount || 0);
    return acc;
  }, {});
  const outstandingTotal = statusBreakdown.outstanding ?? outstanding;

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-[#0b0b0b]/70 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold text-white">Income ledger</h1>
          <p className="text-sm text-white/70">
            Track every inflow from tuition to grants, reconcile statuses, and surface outstanding balances instantly.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/financials/income/export"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/60"
          >
            Export CSV
          </Link>
          <Link
            href="/financials/income/new"
            className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand-500)]"
          >
            Log income
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[{
          label: "Total income",
          value: total.toLocaleString(),
          detail: "Filtered timeframe",
        },
        {
          label: "Outstanding",
          value: outstandingTotal.toLocaleString(),
          detail: "Awaiting settlement",
        },
        {
          label: "Records",
          value: entries.length.toLocaleString(),
          detail: "Entries returned",
        },
        {
          label: "Statuses",
          value: Object.keys(statusBreakdown).length.toLocaleString(),
          detail: "Distribution mix",
        }].map((card) => (
          <div
            key={card.label}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/5 p-5"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-white/45">{card.label}</p>
            <p className="mt-3 text-2xl font-semibold text-white">{card.value}</p>
            <p className="mt-2 text-sm text-white/60">{card.detail}</p>
          </div>
        ))}
      </div>

      <form method="GET" className="glass flex flex-wrap items-end gap-3 rounded-3xl border border-white/10 p-5 text-sm">
        <div className="flex min-w-[180px] flex-col gap-1">
          <label className="text-xs uppercase tracking-[0.24em] text-white/45">Category</label>
          <Select name="category" defaultValue={category}>
            <option value="">All categories</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {formatLabel(option)}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex min-w-[160px] flex-col gap-1">
          <label className="text-xs uppercase tracking-[0.24em] text-white/45">Status</label>
          <Select name="status" defaultValue={status}>
            <option value="">All statuses</option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {formatLabel(option)}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex min-w-[160px] flex-col gap-1">
          <label className="text-xs uppercase tracking-[0.24em] text-white/45">From</label>
          <Input name="from" type="date" defaultValue={from} />
        </div>
        <div className="flex min-w-[160px] flex-col gap-1">
          <label className="text-xs uppercase tracking-[0.24em] text-white/45">To</label>
          <Input name="to" type="date" defaultValue={to} />
        </div>
        <div className="ml-auto flex gap-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Apply filters
          </button>
          <a
            href="/financials/income"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/60"
          >
            Reset
          </a>
        </div>
      </form>

      <div className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-white">Income timeline</h2>
            <span className="text-xs uppercase tracking-[0.28em] text-white/45">{entries.length} entries</span>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.28em] text-white/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Category</th>
                  <th className="px-4 py-3 text-left font-medium">Description</th>
                  <th className="px-4 py-3 text-right font-medium">Amount</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white/80">
                {entries.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-center text-sm text-white/60" colSpan={5}>
                      No income entries match these filters yet.
                    </td>
                  </tr>
                ) : (
                  entries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-white/5">
                      <td className="px-4 py-3">{entry.date}</td>
                      <td className="px-4 py-3 capitalize">{formatLabel(entry.category as string)}</td>
                      <td className="px-4 py-3 text-white/70">{entry.description || "—"}</td>
                      <td className="px-4 py-3 text-right font-medium text-white">
                        {Number(entry.amount).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <Badge color={statusTone(entry.status)}>{entry.status || "—"}</Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-display text-lg font-semibold text-white">Category mix</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {Object.keys(byCategory).length === 0 ? (
                <li className="text-white/60">No income recorded.</li>
              ) : (
                Object.entries(byCategory)
                  .sort((a, b) => b[1] - a[1])
                  .map(([key, value]) => (
                    <li key={key} className="flex items-center justify-between">
                      <span className="capitalize">{formatLabel(key)}</span>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-100">
                        {value.toLocaleString()}
                      </span>
                    </li>
                  ))
              )}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-display text-lg font-semibold text-white">Status spotlight</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {Object.keys(statusBreakdown).length === 0 ? (
                <li className="text-white/60">No statuses recorded.</li>
              ) : (
                Object.entries(statusBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .map(([key, value]) => (
                    <li key={key} className="flex items-center justify-between">
                      <span className="capitalize">{formatLabel(key)}</span>
                      <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white">
                        {value.toLocaleString()}
                      </span>
                    </li>
                  ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
