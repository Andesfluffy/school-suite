"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { FinancialInputSchema } from "@/lib/validation";
import type { FinancialEntry } from "@/lib/mock-data";

export async function createFinancialEntry(formData: FormData) {
  const parsed = FinancialInputSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => i.message).join(", ");
    const errors = parsed.error.flatten().fieldErrors as Record<string, string[]>;
    return { success: false, error: message, errors } as const;
  }
  const { type, category, amount, date, description, studentId, staffId, status } = parsed.data;
  const created = await prisma.financialEntry.create({
    data: {
      type,
      category,
      amount: Number(amount),
      date: date || new Date().toISOString().slice(0, 10),
      description: description || undefined,
      studentId: studentId || undefined,
      staffId: staffId || undefined,
      status: status ? status : undefined,
    },
  });
  revalidatePath(`/financials/${type === "income" ? "income" : "expenses"}`);
  return { success: true, id: created.id } as const;
}

export async function listFinancialEntries(
  type: "income" | "expense",
  filters?: { category?: string; status?: string; from?: string; to?: string }
) {
  type FinancialWhere = {
    type: FinancialEntry["type"];
    category?: FinancialEntry["category"];
    status?: FinancialEntry["status"];
    date?: {
      gte?: FinancialEntry["date"];
      lte?: FinancialEntry["date"];
    };
  };

  const validCategories = new Set<FinancialEntry["category"]>([
    "fees",
    "dues",
    "medical",
    "sanctions",
    "grants",
    "donations",
    "trade_fare",
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
  ]);

  const validStatuses = new Set<NonNullable<FinancialEntry["status"]>>([
    "paid",
    "outstanding",
    "waived",
  ]);

  const where: FinancialWhere = { type };

  if (filters?.category && validCategories.has(filters.category as FinancialEntry["category"])) {
    where.category = filters.category as FinancialEntry["category"];
  }

  if (filters?.status && validStatuses.has(filters.status as NonNullable<FinancialEntry["status"]>)) {
    where.status = filters.status as FinancialEntry["status"];
  }

  if (filters?.from || filters?.to) {
    where.date = {};
    if (filters.from) where.date.gte = filters.from;
    if (filters.to) where.date.lte = filters.to;
  }

  const query = {
    where,
    orderBy: { date: "desc" as const },
  } satisfies NonNullable<Parameters<typeof prisma.financialEntry.findMany>[0]>;

  return prisma.financialEntry.findMany(query);
}
