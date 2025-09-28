import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";

export default function StaffLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth
      section="staff operations console"
      blurb="Login with your school domain to manage contracts, payroll cadences, and leadership reviews."
    >
      {children}
    </RequireAuth>
  );
}
