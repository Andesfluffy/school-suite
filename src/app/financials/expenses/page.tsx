import Link from "next/link";
import { listFinancialEntries } from "../actions";

export default async function ExpensesPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const category = (searchParams.category as string) || "";
  const from = (searchParams.from as string) || "";
  const to = (searchParams.to as string) || "";
  const entries = await listFinancialEntries("expense", {
    category: category || undefined,
    from: from || undefined,
    to: to || undefined,
  });
  const total = entries.reduce((sum, e) => sum + Number(e.amount), 0);
  const byCategory = entries.reduce<Record<string, number>>((acc, e) => {
    acc[e.category as string] = (acc[e.category as string] || 0) + Number(e.amount);
    return acc;
  }, {});
  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Expenses</h1>
        <div className="flex gap-2">
          <Link href="/financials/expenses/export" className="rounded border px-3 py-1 text-sm">Export CSV</Link>
          <Link href="/financials/expenses/new" className="rounded bg-black text-white px-3 py-1 text-sm">Add Expense</Link>
        </div>
      </header>
      <form method="GET" className="flex flex-wrap gap-2 text-sm">
        <label className="flex items-center gap-2">
          <span>Category</span>
          <select name="category" defaultValue={category} className="border p-1 rounded">
            <option value="">All</option>
            {[
              "salaries",
              "benefits",
              "training",
              "utilities",
              "maintenance",
              "lab_equipment",
              "software_license",
              "learning_materials",
              "tax",
              "scholarship",
              "miscellaneous",
            ].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span>From</span>
          <input name="from" type="date" defaultValue={from} className="border p-1 rounded" />
        </label>
        <label className="flex items-center gap-2">
          <span>To</span>
          <input name="to" type="date" defaultValue={to} className="border p-1 rounded" />
        </label>
        <button className="border rounded px-3 py-1">Filter</button>
        <a className="border rounded px-3 py-1" href="/financials/expenses">Reset</a>
      </form>
      <div className="text-sm text-white/70">Total: {total.toLocaleString()}</div>
      <div className="text-sm">
        <div className="font-medium">By Category</div>
        <div className="flex flex-wrap gap-3">
          {Object.keys(byCategory).length === 0 ? (
            <span className="text-gray-500">—</span>
          ) : (
            Object.entries(byCategory).map(([c, amt]) => (
              <div key={c} className="border rounded px-2 py-1">{c}: {amt.toLocaleString()}</div>
            ))
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-white/10">
          <thead className="bg-[#0f172a] text-white/80">
            <tr>
              <th className="text-left p-2 border border-white/10">Date</th>
              <th className="text-left p-2 border border-white/10">Category</th>
              <th className="text-right p-2 border border-white/10">Amount</th>
              <th className="text-left p-2 border border-white/10">Description</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td className="p-2 border border-white/10 text-center" colSpan={4}>No entries</td>
              </tr>
            ) : entries.map((e) => (
              <tr key={e.id}>
                <td className="p-2 border border-white/10">{e.date}</td>
                <td className="p-2 border border-white/10">{e.category}</td>
                <td className="p-2 border border-white/10 text-right">{Number(e.amount).toLocaleString()}</td>
                <td className="p-2 border border-white/10">{e.description || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}





