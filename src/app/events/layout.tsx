import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";
import { requireSchoolSession } from "@/lib/auth/server-session";

export default async function EventsLayout({ children }: { children: ReactNode }) {
  await requireSchoolSession();
  return (
    <RequireAuth
      section="events and communications hub"
      blurb="Authenticate to publish ceremonies, fixtures, notices, and family communications from a single hub."
    >
      {children}
    </RequireAuth>
  );
}
