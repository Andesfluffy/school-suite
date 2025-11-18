import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";
import UnauthenticatedState from "@/components/UnauthenticatedState";
import { requireSchoolSession } from "@/lib/auth/server-session";

export default async function PayrollLayout({ children }: { children: ReactNode }) {
  const session = await requireSchoolSession({ allowUnauthenticated: true, currentPath: "/payroll" });
  if (!session) {
    return (
      <UnauthenticatedState
        section="payroll intelligence workspace"
        blurb="Authenticate as the school to manage payroll readiness, salary runs, and clean audit trails."
      />
    );
  }
  return (
    <RequireAuth
      section="payroll intelligence workspace"
      blurb="Authenticate as the school to manage payroll readiness, salary runs, and clean audit trails."
    >
      {children}
    </RequireAuth>
  );
}
