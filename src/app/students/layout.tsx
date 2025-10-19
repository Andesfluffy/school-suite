import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";
import { requireSchoolSession } from "@/lib/auth/server-session";

export default async function StudentsLayout({ children }: { children: ReactNode }) {
  await requireSchoolSession();
  return (
    <RequireAuth
      section="student intelligence workspace"
      blurb="Authenticate as the school to review biodata, guardians, fees, and performance interventions across every learner."
    >
      {children}
    </RequireAuth>
  );
}
