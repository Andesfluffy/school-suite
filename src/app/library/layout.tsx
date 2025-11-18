import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";
import UnauthenticatedState from "@/components/UnauthenticatedState";
import { requireSchoolSession } from "@/lib/auth/server-session";

export default async function LibraryLayout({ children }: { children: ReactNode }) {
  const session = await requireSchoolSession({ allowUnauthenticated: true, currentPath: "/library" });
  if (!session) {
    return (
      <UnauthenticatedState
        section="library workspace"
        blurb="Authenticate as the school to track catalogue changes, reservations, and circulation."
      />
    );
  }
  return (
    <RequireAuth
      section="library workspace"
      blurb="Authenticate as the school to track catalogue changes, reservations, and circulation."
    >
      {children}
    </RequireAuth>
  );
}
