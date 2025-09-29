import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { listFinancialEntries } from "./actions";

type FinancialEntry = {
  amount: number;
  category: string;
  status?: string | null;
};

type Summary = {
  total: number;
  outstanding: number;
  byCategory: Record<string, number>;
};

function summarise(entries: FinancialEntry[]): Summary {
  const total = entries.reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const outstanding = entries
    .filter((entry) => entry.status === "outstanding")
    .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const byCategory = entries.reduce<Record<string, number>>((acc, entry) => {
    const key = entry.category;
    acc[key] = (acc[key] || 0) + Number(entry.amount || 0);
    return acc;
  }, {});
  return { total, outstanding, byCategory };
}

export default async function FinancialsPage() {
  const [incomeEntries, expenseEntries] = await Promise.all([
    listFinancialEntries("income"),
    listFinancialEntries("expense"),
  ]);

  const incomeSummary = summarise(incomeEntries as unknown as FinancialEntry[]);
  const expenseSummary = summarise(expenseEntries as unknown as FinancialEntry[]);
  const netPosition = incomeSummary.total - expenseSummary.total;
  const receivables = incomeEntries.filter((entry) => entry.status === "outstanding");
  const payables = expenseEntries.filter((entry) => entry.status === "outstanding");
  const topIncomeCategories = Object.entries(incomeSummary.byCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);
  const topExpenseCategories = Object.entries(expenseSummary.byCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <section className="space-y-8">
      <PageHeader
        title="Financials"
        subtitle="See revenue, dues, sanctions, and operating spend in one matte-black command centre."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[{
          label: "Total income",
          value: incomeSummary.total.toLocaleString(),
          detail: "Fees, dues, grants, and more",
        },
        {
          label: "Total expenses",
          value: expenseSummary.total.toLocaleString(),
          detail: "Salaries, maintenance, licences",
        },
        {
          label: "Net position",
          value: netPosition.toLocaleString(),
          detail: netPosition >= 0 ? "Surplus" : "Deficit",
        },
        {
          label: "Outstanding receivables",
          value: incomeSummary.outstanding.toLocaleString(),
          detail: `${receivables.length} awaiting settlement`,
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
      <div className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-[#0b0b0b]/70 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-white">Financial nerve centre</h2>
              <p className="text-sm text-white/70">
                Monitor working capital, reconcile receipts, and trigger financial statements without leaving the dashboard.
              </p>
            </div>
            <Link
              href="/financials/report"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/60"
            >
              Generate report
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">Receivables</p>
              <p className="mt-2 text-2xl font-semibold text-white">{incomeSummary.outstanding.toLocaleString()}</p>
              <p className="mt-1 text-sm text-white/60">{receivables.length} inflows pending settlement.</p>
              <Link
                href="/financials/income?status=outstanding"
                className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--brand-200)] hover:text-[var(--brand)]"
              >
                Review outstanding ↗
              </Link>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">Payables</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {payables.reduce((sum, entry) => sum + Number(entry.amount || 0), 0).toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-white/60">{payables.length} expense obligations queued.</p>
              <Link
                href="/financials/expenses?status=outstanding"
                className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--brand-200)] hover:text-[var(--brand)]"
              >
                View pending payouts ↗
              </Link>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-display text-lg font-semibold text-white">Income composition</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {topIncomeCategories.length === 0 ? (
                <li className="text-white/60">No income recorded yet.</li>
              ) : (
                topIncomeCategories.map(([category, amount]) => (
                  <li key={`income-${category}`} className="flex items-center justify-between">
                    <span className="capitalize">{category.replace(/_/g, " ")}</span>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-100">
                      {amount.toLocaleString()}
                    </span>
                  </li>
                ))
              )}
            </ul>
            <Link
              href="/financials/income"
              className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--brand-200)] hover:text-[var(--brand)]"
            >
              Manage income ↗
            </Link>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-display text-lg font-semibold text-white">Expense composition</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {topExpenseCategories.length === 0 ? (
                <li className="text-white/60">No expenses recorded yet.</li>
              ) : (
                topExpenseCategories.map(([category, amount]) => (
                  <li key={`expense-${category}`} className="flex items-center justify-between">
                    <span className="capitalize">{category.replace(/_/g, " ")}</span>
                    <span className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-sm text-rose-100">
                      {amount.toLocaleString()}
                    </span>
                  </li>
                ))
              )}
            </ul>
            <Link
              href="/financials/expenses"
              className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--brand-200)] hover:text-[var(--brand)]"
            >
              Manage expenses ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
