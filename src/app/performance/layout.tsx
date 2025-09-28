import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";

export default function PerformanceLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth
      section="performance analytics studio"
      blurb="Authenticate with the school workspace to trend attendance, assessments, clubs, and interventions."
    >
      {children}
    </RequireAuth>
  );
}
