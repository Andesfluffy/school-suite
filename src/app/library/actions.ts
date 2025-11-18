"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { LibraryFormat, LibraryResourceType } from "@prisma/client";
import { LibraryAssetInputSchema } from "@/lib/validation";
import { requireSchoolSession } from "@/lib/auth/server-session";

async function ensureSession() {
  await requireSchoolSession();
}

function parseTags(value?: string | null) {
  if (!value) return undefined;
  const tags = value
    .split(/[\n,]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
  return tags.length ? tags : undefined;
}

export async function createLibraryAsset(formData: FormData) {
  await ensureSession();
  const parsed = LibraryAssetInputSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const message = parsed.error.issues.map((issue) => issue.message).join(", ");
    const errors = parsed.error.flatten().fieldErrors as Record<string, string[]>;
    return { success: false, error: message, errors } as const;
  }

  const { title, subject, level, resourceType, format, description, fileUrl, tags, publishedAt, uploaderId } = parsed.data;

  const created = await prisma.libraryAsset.create({
    data: {
      title,
      subject,
      level: level || undefined,
      resourceType: resourceType as LibraryResourceType,
      format: format as LibraryFormat,
      description: description || undefined,
      fileUrl: fileUrl || undefined,
      tags: parseTags(tags || undefined),
      publishedAt: publishedAt || undefined,
      uploaderId: uploaderId || undefined,
      downloads: 0,
    },
    include: { uploader: true },
  });

  revalidatePath("/library");
  return { success: true, id: created.id } as const;
}

export async function listLibraryAssets() {
  await ensureSession();
  return prisma.libraryAsset.findMany({ include: { uploader: true }, orderBy: { createdAt: "desc" } });
}
