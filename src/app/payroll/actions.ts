"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { PayrollInputSchema } from "@/lib/validation";

function parseBreakdown(value: string | undefined, field: "allowances" | "deductions") {
  if (!value) return { items: undefined } as const;
  const lines = value
    .split(/[\n,]/)
    .map((line) => line.trim())
    .filter(Boolean);
  const items: { label: string; amount: number }[] = [];
  for (const line of lines) {
    const [labelPart, amountPart] = line.split(/[:=]/).map((part) => part.trim());
    if (!labelPart || !amountPart) {
      return {
        error: `Could not parse ${field} entry "${line}". Use Label:Amount format.`,
      } as const;
    }
    const numeric = Number(amountPart.replace(/[^0-9.-]/g, ""));
    if (!Number.isFinite(numeric)) {
      return {
        error: `Enter a valid amount for ${field} entry "${line}".`,
      } as const;
    }
    items.push({ label: labelPart, amount: numeric });
  }
  return { items: items.length ? items : undefined } as const;
}

export async function createPayrollRecord(formData: FormData) {
  const parsed = PayrollInputSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const message = parsed.error.issues.map((issue) => issue.message).join(", ");
    const errors = parsed.error.flatten().fieldErrors as Record<string, string[]>;
    return { success: false, error: message, errors } as const;
  }

  const {
    staffId,
    month,
    year,
    grossPay,
    allowances,
    deductions,
    status,
    payDate,
    reference,
    notes,
  } = parsed.data;

  const parsedAllowances = parseBreakdown(allowances || undefined, "allowances");
  if ("error" in parsedAllowances) {
    return { success: false, error: parsedAllowances.error, errors: { allowances: [parsedAllowances.error] } } as const;
  }
  const parsedDeductions = parseBreakdown(deductions || undefined, "deductions");
  if ("error" in parsedDeductions) {
    return { success: false, error: parsedDeductions.error, errors: { deductions: [parsedDeductions.error] } } as const;
  }

  const gross = Number(grossPay);
  const totalAllowances = (parsedAllowances.items || []).reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = (parsedDeductions.items || []).reduce((sum, item) => sum + item.amount, 0);
  const netPay = gross + totalAllowances - totalDeductions;

  const created = await prisma.payrollRecord.create({
    data: {
      staffId,
      month: Number(month),
      year: Number(year),
      grossPay: gross,
      allowances: parsedAllowances.items,
      deductions: parsedDeductions.items,
      netPay,
      status,
      payDate: payDate || undefined,
      reference: reference || undefined,
      notes: notes || undefined,
    },
    include: { staff: true },
  });

  revalidatePath("/payroll");
  return { success: true, id: created.id } as const;
}

export async function listPayrollRecords() {
  return prisma.payrollRecord.findMany({ include: { staff: true }, orderBy: { createdAt: "desc" } });
}
