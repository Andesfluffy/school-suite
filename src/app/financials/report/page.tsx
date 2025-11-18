import { listFinancialEntries } from "../actions";
import PrintButton from "@/components/PrintButton";

export default async function FinancialReportPage({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const from = (resolvedParams.from as string) || "";
  const to = (resolvedParams.to as string) || "";
  const [income, expenses] = await Promise.all([
    listFinancialEntries("income", { from: from || undefined, to: to || undefined }),
    listFinancialEntries("expense", { from: from || undefined, to: to || undefined }),
  ]);
  const incomeTotal = income.reduce((s, e) => s + Number(e.amount), 0);
  const expenseTotal = expenses.reduce((s, e) => s + Number(e.amount), 0);
  const byCat = (arr: typeof income) => arr.reduce<Record<string, number>>((acc, e) => { acc[e.category as string] = (acc[e.category as string] || 0) + Number(e.amount); return acc; }, {});
  const incomeByCat = byCat(income);
  const expensesByCat = byCat(expenses);
  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Financial Report</h1>
        <PrintButton />
      </header>
      <form method="GET" className="flex gap-2 text-sm print:hidden">
        <label className="flex items-center gap-2">
          <span>From</span>
          <input name="from" type="date" defaultValue={from} className="border p-1 rounded" />
        </label>
        <label className="flex items-center gap-2">
          <span>To</span>
          <input name="to" type="date" defaultValue={to} className="border p-1 rounded" />
        </label>
        <button className="border rounded px-3 py-1">Apply</button>
        <a className="border rounded px-3 py-1" href="/financials/report">Reset</a>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-gray-500">Total Income</div>
          <div className="text-2xl font-semibold">{incomeTotal.toLocaleString()}</div>
        </div>
        <div className="card p-4">
          <div className="text-gray-500">Total Expenses</div>
          <div className="text-2xl font-semibold">{expenseTotal.toLocaleString()}</div>
        </div>
        <div className="card p-4">
          <div className="text-gray-500">Balance</div>
          <div className="text-2xl font-semibold">{(incomeTotal - expenseTotal).toLocaleString()}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-4">
          <div className="font-medium mb-3">Income by Category</div>
          <div className="flex flex-wrap gap-3">
            {Object.keys(incomeByCat).length === 0 ? (
              <span className="text-gray-500">—</span>
            ) : (
              Object.entries(incomeByCat).map(([c, amt]) => (
                <div key={c} className="rounded bg-gray-50 border px-3 py-1">{c}: {amt.toLocaleString()}</div>
              ))
            )}
          </div>
        </div>
        <div className="card p-4">
          <div className="font-medium mb-3">Expenses by Category</div>
          <div className="flex flex-wrap gap-3">
            {Object.keys(expensesByCat).length === 0 ? (
              <span className="text-gray-500">—</span>
            ) : (
              Object.entries(expensesByCat).map(([c, amt]) => (
                <div key={c} className="rounded bg-gray-50 border px-3 py-1">{c}: {amt.toLocaleString()}</div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="print:break-before-page">
        <h2 className="font-medium mb-2">Income</h2>
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2 border">Date</th>
              <th className="text-left p-2 border">Category</th>
              <th className="text-right p-2 border">Amount</th>
              <th className="text-left p-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {income.length === 0 ? (
              <tr><td className="p-2 border text-center" colSpan={4}>—</td></tr>
            ) : income.map((e) => (
              <tr key={e.id}>
                <td className="p-2 border">{e.date}</td>
                <td className="p-2 border">{e.category}</td>
                <td className="p-2 border text-right">{Number(e.amount).toLocaleString()}</td>
                <td className="p-2 border">{e.description || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="font-medium mt-6 mb-2">Expenses</h2>
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2 border">Date</th>
              <th className="text-left p-2 border">Category</th>
              <th className="text-right p-2 border">Amount</th>
              <th className="text-left p-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr><td className="p-2 border text-center" colSpan={4}>—</td></tr>
            ) : expenses.map((e) => (
              <tr key={e.id}>
                <td className="p-2 border">{e.date}</td>
                <td className="p-2 border">{e.category}</td>
                <td className="p-2 border text-right">{Number(e.amount).toLocaleString()}</td>
                <td className="p-2 border">{e.description || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

