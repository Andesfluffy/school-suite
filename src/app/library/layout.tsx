import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";
import { requireSchoolSession } from "@/lib/auth/server-session";

export default async function LibraryLayout({ children }: { children: ReactNode }) {
  await requireSchoolSession();
  return (
    <RequireAuth
      section="digital library"
      blurb="Authenticate with your school domain to access protected study resources and share department files."
    >
      {children}
    </RequireAuth>
  );
}
