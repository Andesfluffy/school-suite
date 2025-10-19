import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";
import { requireSchoolSession } from "@/lib/auth/server-session";

export default async function StaffLayout({ children }: { children: ReactNode }) {
  await requireSchoolSession();
  return (
    <RequireAuth
      section="staff operations console"
      blurb="Login with your school domain to manage contracts, payroll cadences, and leadership reviews."
    >
      {children}
    </RequireAuth>
  );
}
