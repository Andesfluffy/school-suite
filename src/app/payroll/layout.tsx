import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";
import { requireSchoolSession } from "@/lib/auth/server-session";

export default async function PayrollLayout({ children }: { children: ReactNode }) {
  await requireSchoolSession();
  return (
    <RequireAuth
      section="payroll centre"
      blurb="Authenticate with your school workspace to publish runs, track statuses, and export payslips."
    >
      {children}
    </RequireAuth>
  );
}
