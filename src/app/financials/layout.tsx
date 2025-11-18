import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";
import UnauthenticatedState from "@/components/UnauthenticatedState";
import { requireSchoolSession } from "@/lib/auth/server-session";

export default async function FinancialsLayout({ children }: { children: ReactNode }) {
  const session = await requireSchoolSession({ allowUnauthenticated: true, currentPath: "/financials" });
  if (!session) {
    return (
      <UnauthenticatedState
        section="financial intelligence workspace"
        blurb="Authenticate as the school to reconcile payments, monitor balances, and keep stakeholders aligned."
      />
    );
  }
  return (
    <RequireAuth
      section="financial intelligence workspace"
      blurb="Authenticate as the school to reconcile payments, monitor balances, and keep stakeholders aligned."
    >
      {children}
    </RequireAuth>
  );
}
