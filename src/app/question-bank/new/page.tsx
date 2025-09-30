import { prisma } from "@/lib/db";
import QuestionBankForm from "@/components/QuestionBankForm";
import { createQuestionBankItem } from "../actions";

export default async function NewQuestionBankItemPage() {
  const staff = await prisma.staff.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } });
  return (
    <section className="space-y-6 max-w-2xl">
      <h1 className="text-xl font-semibold text-white">Add assessment</h1>
      <p className="text-sm text-white/70">
        Prepare assessment blueprints ahead of time with marks, duration, and release schedule.
      </p>
      <QuestionBankForm action={createQuestionBankItem} staff={staff} redirectTo="/question-bank" />
    </section>
  );
}
