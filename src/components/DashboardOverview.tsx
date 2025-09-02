import { prisma } from "@/lib/db";
import FinancialChart from "@/components/FinancialChart";

export default async function DashboardOverview() {
  const [students, staff, fin] = await Promise.all([
    prisma.student.count(),
    prisma.staff.count(),
    prisma.financialEntry.findMany({ orderBy: { date: "asc" } }),
  ]);

  const incomeByMonth: Record<string, number> = {};
  const expenseByMonth: Record<string, number> = {};
  for (const e of fin) {
    const m = (e.date || "").slice(0, 7) || "unknown";
    const dict = e.type === "income" ? incomeByMonth : expenseByMonth;
    dict[m] = (dict[m] || 0) + Number(e.amount);
  }
  const months = Array.from(new Set([...Object.keys(incomeByMonth), ...Object.keys(expenseByMonth)])).sort();
  const data = months.slice(-12).map((m) => ({
    month: m,
    income: incomeByMonth[m] || 0,
    expense: expenseByMonth[m] || 0,
  }));

  return (
    <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="card p-5">
        <div className="text-sm text-white/70">Students</div>
        <div className="text-2xl font-semibold">{students.toLocaleString()}</div>
      </div>
      <div className="card p-5">
        <div className="text-sm text-white/70">Staff</div>
        <div className="text-2xl font-semibold">{staff.toLocaleString()}</div>
      </div>
      <div className="card p-5">
        <div className="text-sm text-white/70">Financials (12‑mo)</div>
        <div className="mt-2 h-40">
          <FinancialChart data={data} />
        </div>
      </div>
    </section>
  );
}

