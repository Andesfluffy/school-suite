import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";
import UnauthenticatedState from "@/components/UnauthenticatedState";
import { requireSchoolSession } from "@/lib/auth/server-session";

export default async function EventsLayout({ children }: { children: ReactNode }) {
  const session = await requireSchoolSession({ allowUnauthenticated: true, currentPath: "/events" });
  if (!session) {
    return (
      <UnauthenticatedState
        section="events and community workspace"
        blurb="Authenticate as the school to build schedules, communicate changes, and keep your calendar in sync."
      />
    );
  }
  return (
    <RequireAuth
      section="events and community workspace"
      blurb="Authenticate as the school to build schedules, communicate changes, and keep your calendar in sync."
    >
      {children}
    </RequireAuth>
  );
}
