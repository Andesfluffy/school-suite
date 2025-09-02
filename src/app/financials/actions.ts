"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { FinancialInputSchema } from "@/lib/validation";

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
      type: type as any,
      category: category as any,
      amount: Number(amount),
      date: date || new Date().toISOString().slice(0, 10),
      description: description || undefined,
      studentId: studentId || undefined,
      staffId: staffId || undefined,
      status: status ? (status as any) : undefined,
    },
  });
  revalidatePath(`/financials/${type === "income" ? "income" : "expenses"}`);
  return { success: true, id: created.id } as const;
}

export async function listFinancialEntries(
  type: "income" | "expense",
  filters?: { category?: string; status?: string; from?: string; to?: string }
) {
  const where: any = { type };
  if (filters?.category) where.category = filters.category as any;
  if (filters?.status) where.status = filters.status as any;
  if (filters?.from || filters?.to) {
    where.date = {} as any;
    if (filters.from) where.date.gte = filters.from;
    if (filters.to) where.date.lte = filters.to;
  }
  return prisma.financialEntry.findMany({ where, orderBy: { date: "desc" } });
}
