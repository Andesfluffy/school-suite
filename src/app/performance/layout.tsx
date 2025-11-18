import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";
import UnauthenticatedState from "@/components/UnauthenticatedState";
import { requireSchoolSession } from "@/lib/auth/server-session";

export default async function PerformanceLayout({ children }: { children: ReactNode }) {
  const session = await requireSchoolSession({ allowUnauthenticated: true, currentPath: "/performance" });
  if (!session) {
    return (
      <UnauthenticatedState
        section="performance tracking workspace"
        blurb="Authenticate as the school to see class averages, interventions, and momentum at a glance."
      />
    );
  }
  return (
    <RequireAuth
      section="performance tracking workspace"
      blurb="Authenticate as the school to see class averages, interventions, and momentum at a glance."
    >
      {children}
    </RequireAuth>
  );
}
