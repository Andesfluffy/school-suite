"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { AcademicInputSchema } from "@/lib/validation";
import type { Prisma } from "@prisma/client";
import { requireSchoolSession } from "@/lib/auth/server-session";

export type AcademicRecordWithStudent = Prisma.AcademicRecordGetPayload<{ include: { student: true } }>;

async function ensureSession() {
  await requireSchoolSession();
}

export async function createAcademicRecord(formData: FormData) {
  await ensureSession();
  const parsed = AcademicInputSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => i.message).join(", ");
    const errors = parsed.error.flatten().fieldErrors as Record<string, string[]>;
    return { success: false, error: message, errors } as const;
  }
  const { studentId, term, attendance, grade, cgpa } = parsed.data;
  const created = await prisma.academicRecord.create({
    data: {
      studentId,
      term,
      attendance: attendance ? Number(attendance) : undefined,
      grade: grade || undefined,
      cgpa: cgpa ? Number(cgpa) : undefined,
    },
    include: { student: true },
  });
  revalidatePath("/performance");
  return { success: true, id: created.id } as const;
}

export async function listAcademicRecords(): Promise<AcademicRecordWithStudent[]> {
  await ensureSession();
  const records = await prisma.academicRecord.findMany({
    include: { student: true },
    orderBy: { createdAt: "desc" },
  });
  return records;
}

export async function performanceDashboard() {
  await ensureSession();
  const records = await prisma.academicRecord.findMany();
  const count = records.length;
  const avgAttendance = count ? records.reduce((s, r) => s + (r.attendance ?? 0), 0) / count : 0;
  const avgCgpa = count ? records.reduce((s, r) => s + (r.cgpa ?? 0), 0) / count : 0;
  return { count, avgAttendance, avgCgpa };
}

