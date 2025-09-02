import AcademicForm from "@/components/AcademicForm";
import { createAcademicRecord } from "../actions";
import { prisma } from "@/lib/db";

export default async function NewPerformanceRecordPage() {
  const students = await prisma.student.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } });
  return (
    <section className="space-y-6 max-w-2xl">
      <h1 className="text-xl font-semibold">Add Performance Record</h1>
      <AcademicForm action={createAcademicRecord} students={students} redirectTo="/performance" />
    </section>
  );
}

