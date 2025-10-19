"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { StaffInputSchema } from "@/lib/validation";

export async function createStaff(formData: FormData) {
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
      status,
      dob: dob || undefined,
      phone: phone || undefined,
      photoUrl: photoUrl || undefined,
      stateOfOrigin: stateOfOrigin || undefined,
      disabilities: disabilities ? disabilities.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
      rank: rank || undefined,
      salary: salary ? Number(salary) : undefined,
      role,
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
  return prisma.staff.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getStaff(id: string) {
  return prisma.staff.findUnique({ where: { id } });
}

export async function updateStaff(id: string, formData: FormData) {
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
      status,
      dob: dob || undefined,
      phone: phone || undefined,
      photoUrl: photoUrl || undefined,
      stateOfOrigin: stateOfOrigin || undefined,
      disabilities: disabilities ? disabilities.split(",").map((s) => s.trim()).filter(Boolean) : null,
      rank: rank || undefined,
      salary: salary ? Number(salary) : null,
      role,
      subjects: subjects ? subjects.split(",").map((s) => s.trim()).filter(Boolean) : null,
      department: department || undefined,
      sanction: sanction || undefined,
      clubs: clubs ? clubs.split(",").map((s) => s.trim()).filter(Boolean) : null,
      qualification: qualification || undefined,
    },
  });
  revalidatePath("/staff");
  return { success: true, id: updated.id } as const;
}

export async function deleteStaff(id: string) {
  await prisma.staff.delete({ where: { id } });
  revalidatePath("/staff");
  redirect("/staff");
}
