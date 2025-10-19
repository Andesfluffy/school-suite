"use server";

import { prisma } from "@/lib/db";
import { EventInputSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSchoolSession } from "@/lib/auth/server-session";

async function ensureSession() {
  await requireSchoolSession();
}

function normaliseAudience(audience?: string | null) {
  if (!audience) return undefined;
  const entries = audience
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return entries.length ? entries : undefined;
}

function toIsoString(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }
  return date.toISOString();
}

export async function listEvents() {
  await ensureSession();
  return prisma.eventItem.findMany({ orderBy: { date: "asc" } });
}

export async function getEvent(id: string) {
  await ensureSession();
  return prisma.eventItem.findUnique({ where: { id } });
}

export async function createEvent(formData: FormData) {
  await ensureSession();
  const parsed = EventInputSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const message = parsed.error.issues.map((issue) => issue.message).join(", ");
    const errors = parsed.error.flatten().fieldErrors as Record<string, string[]>;
    return { success: false, error: message, errors } as const;
  }

  const { title, date, description, audience } = parsed.data;

  const created = await prisma.eventItem.create({
    data: {
      title,
      date: toIsoString(date),
      description: description || undefined,
      audience: normaliseAudience(audience),
    },
  });

  revalidatePath("/events");
  return { success: true, id: created.id } as const;
}

export async function updateEvent(id: string, formData: FormData) {
  await ensureSession();
  const parsed = EventInputSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const message = parsed.error.issues.map((issue) => issue.message).join(", ");
    const errors = parsed.error.flatten().fieldErrors as Record<string, string[]>;
    return { success: false, error: message, errors } as const;
  }

  const { title, date, description, audience } = parsed.data;

  const updated = await prisma.eventItem.update({
    where: { id },
    data: {
      title,
      date: toIsoString(date),
      description: description || undefined,
      audience: normaliseAudience(audience) ?? null,
    },
  });

  revalidatePath("/events");
  revalidatePath(`/events/${id}`);
  return { success: true, id: updated.id } as const;
}

export async function deleteEvent(id: string) {
  await ensureSession();
  await prisma.eventItem.delete({ where: { id } });
  revalidatePath("/events");
  redirect("/events");
}
