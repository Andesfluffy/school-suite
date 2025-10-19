import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSchoolSessionFromCookie } from "@/lib/auth/server-session";

type FinancialPoint = { month: string; income: number; expense: number };

type OverviewPayload = {
  students: number;
  staff: number;
  financials: FinancialPoint[];
};

export async function GET() {
  const session = await getSchoolSessionFromCookie();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  try {
    const [students, staff, financialEntries] = await Promise.all([
      prisma.student.count(),
      prisma.staff.count(),
      prisma.financialEntry.findMany({ orderBy: { date: "asc" } }),
    ]);

    const incomeByMonth: Record<string, number> = {};
    const expenseByMonth: Record<string, number> = {};

    for (const entry of financialEntries) {
      const month = (entry.date || "").slice(0, 7) || "unknown";
      if (entry.type === "income") {
        incomeByMonth[month] = (incomeByMonth[month] || 0) + Number(entry.amount || 0);
      } else {
        expenseByMonth[month] = (expenseByMonth[month] || 0) + Number(entry.amount || 0);
      }
    }

    const months = Array.from(
      new Set([...Object.keys(incomeByMonth), ...Object.keys(expenseByMonth)]),
    ).sort();

    const financials: FinancialPoint[] = months.slice(-12).map((month) => ({
      month,
      income: incomeByMonth[month] || 0,
      expense: expenseByMonth[month] || 0,
    }));

    const payload: OverviewPayload = {
      students,
      staff,
      financials,
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Failed to load dashboard overview", error);
    return NextResponse.json(
      { error: "Unable to load dashboard overview" },
      { status: 500 },
    );
  }
}
