import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";
import UnauthenticatedState from "@/components/UnauthenticatedState";
import { requireSchoolSession } from "@/lib/auth/server-session";

export default async function StaffLayout({ children }: { children: ReactNode }) {
  const session = await requireSchoolSession({ allowUnauthenticated: true, currentPath: "/staff" });
  if (!session) {
    return (
      <UnauthenticatedState
        section="staff operations workspace"
        blurb="Authenticate as the school to manage staffing, credentials, and contact details with confidence."
      />
    );
  }
  return (
    <RequireAuth
      section="staff operations workspace"
      blurb="Authenticate as the school to manage staffing, credentials, and contact details with confidence."
    >
      {children}
    </RequireAuth>
  );
}
