import { prisma } from "@/lib/db";
import PayrollForm from "@/components/PayrollForm";
import { createPayrollRecord } from "../actions";

export default async function NewPayrollRecordPage() {
  const staff = await prisma.staff.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } });
  return (
    <section className="space-y-6 max-w-2xl">
      <h1 className="text-xl font-semibold text-white">Generate payslip</h1>
      <p className="text-sm text-white/70">
        Capture gross pay, allowances, deductions, and reference details before issuing to staff members.
      </p>
      <PayrollForm action={createPayrollRecord} staff={staff} redirectTo="/payroll" />
    </section>
  );
}
