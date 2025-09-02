import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export default function FinancialsPage() {
  return (
    <section className="space-y-6">
      <PageHeader title="Financials" subtitle="Manage income and expenses, and generate reports." />
      <h1 className="text-xl font-semibold">Financials</h1>
      <p className="text-sm text-white/70">
        Manage fees, dues, medicals, sanctions, income sources and expenses.
      </p>
      <div className="flex gap-4 text-sm">
        <Link href="/financials/income" className="rounded border px-3 py-2">Income</Link>
        <Link href="/financials/expenses" className="rounded border px-3 py-2">Expenses</Link>
      </div>
      <div className="border p-4 rounded text-sm">Overview: Coming soon</div>
    </section>
  );
}

