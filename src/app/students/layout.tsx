import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";

export default function StudentsLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth
      section="student intelligence workspace"
      blurb="Authenticate as the school to review biodata, guardians, fees, and performance interventions across every learner."
    >
      {children}
    </RequireAuth>
  );
}
