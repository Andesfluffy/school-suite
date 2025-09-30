"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { QuestionBankInputSchema } from "@/lib/validation";

export async function createQuestionBankItem(formData: FormData) {
  const parsed = QuestionBankInputSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const message = parsed.error.issues.map((issue) => issue.message).join(", ");
    const errors = parsed.error.flatten().fieldErrors as Record<string, string[]>;
    return { success: false, error: message, errors } as const;
  }

  const {
    title,
    subject,
    term,
    gradeLevel,
    examType,
    totalMarks,
    durationMinutes,
    scheduledDate,
    instructions,
    fileUrl,
    uploaderId,
  } = parsed.data;

  const created = await prisma.questionBankItem.create({
    data: {
      title,
      subject,
      term: term || undefined,
      gradeLevel: gradeLevel || undefined,
      examType: examType || undefined,
      totalMarks: totalMarks ? Number(totalMarks) : undefined,
      durationMinutes: durationMinutes ? Number(durationMinutes) : undefined,
      scheduledDate: scheduledDate || undefined,
      instructions: instructions || undefined,
      fileUrl: fileUrl || undefined,
      uploaderId: uploaderId || undefined,
    },
    include: { uploader: true },
  });

  revalidatePath("/question-bank");
  return { success: true, id: created.id } as const;
}

export async function listQuestionBankItems() {
  return prisma.questionBankItem.findMany({ include: { uploader: true }, orderBy: { createdAt: "desc" } });
}
