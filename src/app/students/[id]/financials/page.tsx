import { prisma } from "@/lib/db";

export default async function StudentFinancials({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entries = await prisma.financialEntry.findMany({ where: { studentId: id }, orderBy: { date: "desc" } });
  const totalIncome = entries.filter(e => e.type === "income").reduce((s, e) => s + Number(e.amount), 0);
  const totalExpense = entries.filter(e => e.type === "expense").reduce((s, e) => s + Number(e.amount), 0);
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4"><div className="text-gray-500">Income</div><div className="text-xl font-semibold">{totalIncome.toLocaleString()}</div></div>
        <div className="card p-4"><div className="text-gray-500">Expenses</div><div className="text-xl font-semibold">{totalExpense.toLocaleString()}</div></div>
        <div className="card p-4"><div className="text-gray-500">Balance</div><div className="text-xl font-semibold">{(totalIncome-totalExpense).toLocaleString()}</div></div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2 border">Date</th>
              <th className="text-left p-2 border">Type</th>
              <th className="text-left p-2 border">Category</th>
              <th className="text-right p-2 border">Amount</th>
              <th className="text-left p-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr><td className="p-2 border text-center" colSpan={5}>No financial entries</td></tr>
            ) : entries.map((e) => (
              <tr key={e.id}>
                <td className="p-2 border">{e.date}</td>
                <td className="p-2 border">{e.type}</td>
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

