"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { StudentInputSchema } from "@/lib/validation";
import { requireSchoolSession } from "@/lib/auth/server-session";

async function ensureSession() {
  await requireSchoolSession();
}

export async function createStudent(formData: FormData) {
  await ensureSession();
  const parsed = StudentInputSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => i.message).join(", ");
    const errors = parsed.error.flatten().fieldErrors as Record<string, string[]>;
    return { success: false, error: message, errors } as const;
  }
  const {
    name,
    status,
    dob,
    photoUrl,
    guardianName,
    guardianPhone,
    stateOfOrigin,
    scholarship,
    medicalIssues,
    disabilities,
    clubs,
  } = parsed.data;

  const created = await prisma.student.create({
    data: {
      name,
      status,
      dob: dob || undefined,
      photoUrl: photoUrl || undefined,
      guardian: guardianName ? { name: guardianName, phone: guardianPhone || undefined } : undefined,
      stateOfOrigin: stateOfOrigin || undefined,
      scholarship: scholarship || undefined,
      medicalIssues: medicalIssues ? medicalIssues.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
      disabilities: disabilities ? disabilities.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
      clubs: clubs ? clubs.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
    },
  });
  revalidatePath("/students");
  return { success: true, id: created.id } as const;
}

export async function listStudents() {
  await ensureSession();
  return prisma.student.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getStudent(id: string) {
  await ensureSession();
  return prisma.student.findUnique({ where: { id } });
}

export async function updateStudent(id: string, formData: FormData) {
  await ensureSession();
  const parsed = StudentInputSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => i.message).join(", ");
    const errors = parsed.error.flatten().fieldErrors as Record<string, string[]>;
    return { success: false, error: message, errors } as const;
  }
  const {
    name,
    status,
    dob,
    photoUrl,
    guardianName,
    guardianPhone,
    stateOfOrigin,
    scholarship,
    medicalIssues,
    disabilities,
    clubs,
  } = parsed.data;

  const updated = await prisma.student.update({
    where: { id },
    data: {
      name,
      status,
      dob: dob || undefined,
      photoUrl: photoUrl || undefined,
      guardian: guardianName ? { name: guardianName, phone: guardianPhone || undefined } : null,
      stateOfOrigin: stateOfOrigin || undefined,
      scholarship: scholarship || undefined,
      medicalIssues: medicalIssues ? medicalIssues.split(",").map((s) => s.trim()).filter(Boolean) : null,
      disabilities: disabilities ? disabilities.split(",").map((s) => s.trim()).filter(Boolean) : null,
      clubs: clubs ? clubs.split(",").map((s) => s.trim()).filter(Boolean) : null,
    },
  });
  revalidatePath("/students");
  return { success: true, id: updated.id } as const;
}

export async function deleteStudent(id: string) {
  await ensureSession();
  await prisma.student.delete({ where: { id } });
  revalidatePath("/students");
  redirect("/students");
}
