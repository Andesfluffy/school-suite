import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";
import { requireSchoolSession } from "@/lib/auth/server-session";

export default async function PerformanceLayout({ children }: { children: ReactNode }) {
  await requireSchoolSession();
  return (
    <RequireAuth
      section="performance analytics studio"
      blurb="Authenticate with the school workspace to trend attendance, assessments, clubs, and interventions."
    >
      {children}
    </RequireAuth>
  );
}
