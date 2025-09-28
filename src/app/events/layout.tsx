import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";

export default function EventsLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth
      section="events and communications hub"
      blurb="Authenticate to publish ceremonies, fixtures, notices, and family communications from a single hub."
    >
      {children}
    </RequireAuth>
  );
}
