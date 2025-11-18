import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";
import UnauthenticatedState from "@/components/UnauthenticatedState";
import { requireSchoolSession } from "@/lib/auth/server-session";

export default async function StudentsLayout({ children }: { children: ReactNode }) {
  const session = await requireSchoolSession({ allowUnauthenticated: true, currentPath: "/students" });
  if (!session) {
    return (
      <UnauthenticatedState
        section="student intelligence workspace"
        blurb="Authenticate as the school to review biodata, guardians, fees, and performance interventions across every learner."
      />
    );
  }
  return (
    <RequireAuth
      section="student intelligence workspace"
      blurb="Authenticate as the school to review biodata, guardians, fees, and performance interventions across every learner."
    >
      {children}
    </RequireAuth>
  );
}
