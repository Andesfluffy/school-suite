import type { ReactNode } from "react";
import RequireAuth from "@/components/RequireAuth";

export default function FinancialsLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth
      section="financial command desk"
      blurb="Sign in as the school to reconcile income, expenses, and cashflow with audit-ready exports."
    >
      {children}
    </RequireAuth>
  );
}
