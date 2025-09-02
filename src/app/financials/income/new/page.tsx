import FinancialForm from "@/components/FinancialForm";
import { createFinancialEntry } from "../../actions";
import { prisma } from "@/lib/db";

export default async function NewIncomePage() {
  const [students, staff] = await Promise.all([
    prisma.student.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
    prisma.staff.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);
  return (
    <section className="space-y-6 max-w-2xl">
      <h1 className="text-xl font-semibold">Add Income</h1>
      <FinancialForm type="income" action={createFinancialEntry} redirectTo="/financials/income" students={students} staff={staff} />
    </section>
  );
}
