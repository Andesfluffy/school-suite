import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";
import { requireSchoolSession } from "@/lib/auth/server-session";

export default async function QuestionBankLayout({ children }: { children: ReactNode }) {
  await requireSchoolSession();
  return (
    <RequireAuth
      section="question bank"
      blurb="Authenticate with your school domain to curate assessments, schedules, and marking schemes."
    >
      {children}
    </RequireAuth>
  );
}
