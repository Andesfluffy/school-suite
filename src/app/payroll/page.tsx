import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { listPayrollRecords } from "./actions";

const statusLabels: Record<string, string> = {
  draft: "Draft",
  processed: "Processed",
  issued: "Issued",
  paid: "Paid",
};

type PayrollRecord = Awaited<ReturnType<typeof listPayrollRecords>> extends (infer T)[] ? T : never;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(value);
}

function formatPeriod(record: PayrollRecord) {
  const monthDate = new Date(record.year, Math.max(0, record.month - 1));
  const monthLabel = monthDate.toLocaleString("en-US", { month: "short" });
  return `${monthLabel} ${record.year}`;
}

function summariseBreakdown(records: PayrollRecord[], field: "allowances" | "deductions") {
  const accumulator = new Map<string, number>();
  for (const record of records) {
    const entries = (record[field] as { label: string; amount: number }[] | null) ?? [];
    for (const entry of entries) {
      const current = accumulator.get(entry.label) ?? 0;
      accumulator.set(entry.label, current + Number(entry.amount || 0));
    }
  }
  return Array.from(accumulator.entries()).sort((a, b) => b[1] - a[1]);
}

export default async function PayrollPage() {
  const records = await listPayrollRecords();
  const totalNet = records.reduce((sum, record) => sum + Number(record.netPay || 0), 0);
  const paidCount = records.filter((record) => record.status === "paid").length;
  const outstanding = records.filter((record) => record.status !== "paid").length;
  const latest = records.slice(0, 5);
  const staffCovered = new Set(records.map((record) => record.staffId)).size;
  const allowanceSummary = summariseBreakdown(records, "allowances");
  const deductionSummary = summariseBreakdown(records, "deductions");

  return (
    <section className="space-y-8">
      <PageHeader
        title="Payroll"
        subtitle="Generate, review, and issue payslips with transparent allowance and deduction breakdowns for every staff cadre."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[{
          label: "Payslips issued",
          value: records.length.toLocaleString(),
          detail: `${staffCovered} staff covered`,
        },
        {
          label: "Net payroll value",
          value: formatCurrency(totalNet),
          detail: "Total net paid to date",
        },
        {
          label: "Settled",
          value: paidCount.toLocaleString(),
          detail: `${records.length ? Math.round((paidCount / records.length) * 100) : 0}% paid`,
        },
        {
          label: "Awaiting payout",
          value: outstanding ? outstanding.toLocaleString() : "—",
          detail: outstanding ? `${outstanding} ready to issue` : "All paid",
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

      <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-[#0b0b0b]/70 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold text-white">Salary control room</h2>
          <p className="text-sm text-white/70">
            Capture allowances, statutory deductions, and references on each run so HR and bursary operate off the same ledger.
          </p>
        </div>
        <Link
          href="/payroll/new"
          className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand-500)]"
        >
          Generate payslip
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.05fr,0.95fr]">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-white">Latest payslips</h3>
            <span className="text-xs uppercase tracking-[0.28em] text-white/45">Chronological</span>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.28em] text-white/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Staff</th>
                  <th className="px-4 py-3 text-left font-medium">Period</th>
                  <th className="px-4 py-3 text-left font-medium">Gross</th>
                  <th className="px-4 py-3 text-left font-medium">Net</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white/80">
                {latest.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-center text-white/60" colSpan={6}>
                      No payroll cycles recorded. Generate the first payslip to begin tracking staff compensation.
                    </td>
                  </tr>
                ) : (
                  latest.map((record) => (
                    <tr key={record.id} className="hover:bg-white/5">
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{record.staff?.name ?? record.staffId}</div>
                        <div className="text-xs text-white/60">{record.staff?.department ?? "Staff"}</div>
                      </td>
                      <td className="px-4 py-3">{formatPeriod(record)}</td>
                      <td className="px-4 py-3">{formatCurrency(Number(record.grossPay || 0))}</td>
                      <td className="px-4 py-3">{formatCurrency(Number(record.netPay || 0))}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs uppercase tracking-[0.18em] text-white/70">
                          {statusLabels[record.status] || record.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/70">{record.reference ?? "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-display text-lg font-semibold text-white">Allowance mix</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {allowanceSummary.length === 0 ? (
                <li className="text-white/60">No allowances recorded.</li>
              ) : (
                allowanceSummary.slice(0, 4).map(([label, amount]) => (
                  <li key={label} className="flex items-center justify-between">
                    <span>{label}</span>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-100">
                      {formatCurrency(amount)}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-display text-lg font-semibold text-white">Deduction mix</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {deductionSummary.length === 0 ? (
                <li className="text-white/60">No deductions recorded.</li>
              ) : (
                deductionSummary.slice(0, 4).map(([label, amount]) => (
                  <li key={label} className="flex items-center justify-between">
                    <span>{label}</span>
                    <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-sm text-rose-100">
                      {formatCurrency(amount)}
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
