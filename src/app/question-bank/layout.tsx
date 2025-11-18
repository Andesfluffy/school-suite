import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";
import UnauthenticatedState from "@/components/UnauthenticatedState";
import { requireSchoolSession } from "@/lib/auth/server-session";

export default async function QuestionBankLayout({ children }: { children: ReactNode }) {
  const session = await requireSchoolSession({ allowUnauthenticated: true, currentPath: "/question-bank" });
  if (!session) {
    return (
      <UnauthenticatedState
        section="question bank workspace"
        blurb="Authenticate as the school to curate question pools, map them to standards, and keep assessments aligned."
      />
    );
  }
  return (
    <RequireAuth
      section="question bank workspace"
      blurb="Authenticate as the school to curate question pools, map them to standards, and keep assessments aligned."
    >
      {children}
    </RequireAuth>
  );
}
