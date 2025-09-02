import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const entries = await prisma.financialEntry.findMany({
    where: { type: "income" },
    orderBy: { date: "desc" },
  });
  const rows = [
    ["date", "category", "amount", "description", "status", "studentId", "staffId"],
    ...entries.map((e) => [e.date, e.category, e.amount, e.description ?? "", e.status ?? "", e.studentId ?? "", e.staffId ?? ""]),
  ];
  const csv = rows.map((r) => r.map((v) => `${v}`.replaceAll('"', '""')).map((v) => `"${v}"`).join(",")).join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename=income.csv`,
    },
  });
}

