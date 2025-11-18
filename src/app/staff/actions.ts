"use server";

import { Prisma, StaffRole, Status } from "@prisma/client";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { StaffInputSchema } from "@/lib/validation";
import { requireSchoolSession } from "@/lib/auth/server-session";

async function ensureSession() {
  await requireSchoolSession();
}

export async function createStaff(formData: FormData) {
  await ensureSession();
  const parsed = StaffInputSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => i.message).join(", ");
    const errors = parsed.error.flatten().fieldErrors as Record<string, string[]>;
    return { success: false, error: message, errors } as const;
  }
  const {
    name,
    status,
    dob,
    phone,
    photoUrl,
    stateOfOrigin,
    disabilities,
    rank,
    salary,
    role,
    subjects,
    department,
    sanction,
    clubs,
    qualification,
  } = parsed.data;

  const created = await prisma.staff.create({
    data: {
      name,
      status: status as Status,
      dob: dob || undefined,
      phone: phone || undefined,
      photoUrl: photoUrl || undefined,
      stateOfOrigin: stateOfOrigin || undefined,
      disabilities: disabilities ? disabilities.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
      rank: rank || undefined,
      salary: salary ? Number(salary) : undefined,
      role: role as StaffRole,
      subjects: subjects ? subjects.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
      department: department || undefined,
      sanction: sanction || undefined,
      clubs: clubs ? clubs.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
      qualification: qualification || undefined,
    },
  });
  revalidatePath("/staff");
  return { success: true, id: created.id } as const;
}

export async function listStaff() {
  await ensureSession();
  return prisma.staff.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getStaff(id: string) {
  await ensureSession();
  return prisma.staff.findUnique({ where: { id } });
}

export async function updateStaff(id: string, formData: FormData) {
  await ensureSession();
  const parsed = StaffInputSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => i.message).join(", ");
    const errors = parsed.error.flatten().fieldErrors as Record<string, string[]>;
    return { success: false, error: message, errors } as const;
  }
  const {
    name,
    status,
    dob,
    phone,
    photoUrl,
    stateOfOrigin,
    disabilities,
    rank,
    salary,
    role,
    subjects,
    department,
    sanction,
    clubs,
    qualification,
  } = parsed.data;

  const updated = await prisma.staff.update({
    where: { id },
    data: {
      name,
      status: status as Status,
      dob: dob || undefined,
      phone: phone || undefined,
      photoUrl: photoUrl || undefined,
      stateOfOrigin: stateOfOrigin || undefined,
      disabilities:
        disabilities && disabilities.trim()
          ? disabilities.split(",").map((s) => s.trim()).filter(Boolean)
          : Prisma.JsonNull,
      rank: rank || undefined,
      salary: salary ? Number(salary) : null,
      role: role as StaffRole,
      subjects:
        subjects && subjects.trim()
          ? subjects.split(",").map((s) => s.trim()).filter(Boolean)
          : Prisma.JsonNull,
      department: department || undefined,
      sanction: sanction || undefined,
      clubs:
        clubs && clubs.trim()
          ? clubs.split(",").map((s) => s.trim()).filter(Boolean)
          : Prisma.JsonNull,
      qualification: qualification || undefined,
    },
  });
  revalidatePath("/staff");
  return { success: true, id: updated.id } as const;
}

export async function deleteStaff(id: string) {
  await ensureSession();
  await prisma.staff.delete({ where: { id } });
  revalidatePath("/staff");
  redirect("/staff");
}
