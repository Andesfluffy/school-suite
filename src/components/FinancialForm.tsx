"use client";

import { useActionState } from "react";
import { useToast } from "@/components/ToastProvider";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

type Action = (formData: FormData) => Promise<{ success: boolean; id?: string; error?: string; errors?: Record<string, string[]> }>;

export default function FinancialForm({
  type,
  action,
  redirectTo,
  students = [],
  staff = [],
}: {
  type: "income" | "expense";
  action: Action;
  redirectTo: string;
  students?: { id: string; name: string }[];
  staff?: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(async (_prev: any, formData: FormData) => {
    formData.set("type", type);
    const res = await action(formData);
    if (res.success) {
      toast.addToast({ title: "Saved", description: `${type === "income" ? "Income" : "Expense"} recorded`, variant: "success" });
      router.push(redirectTo);
      router.refresh();
    }
    return res;
  }, null as any);
  const toast = useToast();

  const incomeCategories = [
    "fees",
    "dues",
    "medical",
    "sanctions",
    "grants",
    "donations",
    "trade_fare",
  ];
  const expenseCategories = [
    "salaries",
    "benefits",
    "training",
    "utilities",
    "maintenance",
    "lab_equipment",
    "software_license",
    "learning_materials",
    "tax",
    "scholarship",
    "miscellaneous",
  ];
  const categories = type === "income" ? incomeCategories : expenseCategories;
  const studentCategories = new Set(["fees", "dues", "medical", "sanctions", "scholarship"]);
  const staffCategories = new Set(["salaries", "benefits", "training"]);

  return (
    <form action={formAction} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      {state?.error ? <div className="sm:col-span-2 text-red-600">{state.error}</div> : null}
      <input type="hidden" name="type" value={type} />
      <Label>
        <span>Category</span>
        <Select name="category">
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
        {state?.errors?.category?.[0] ? <span className="text-red-600">{state.errors.category[0]}</span> : null}
      </Label>
      {/* Associations (conditional) */}
      <Label>
        <span>Student (if applicable)</span>
        <Select name="studentId">
          <option value="">—</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </Select>
      </Label>
      <Label>
        <span>Staff (if applicable)</span>
        <Select name="staffId">
          <option value="">—</option>
          {staff.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </Select>
      </Label>
      <Label>
        <span>Amount</span>
        <Input name="amount" type="number" step="0.01" />
        {state?.errors?.amount?.[0] ? <span className="text-red-600">{state.errors.amount[0]}</span> : null}
      </Label>
      <Label>
        <span>Date</span>
        <Input name="date" type="date" />
      </Label>
      <Label>
        <span>Status</span>
        <Select name="status">
          <option value="">—</option>
          <option value="paid">paid</option>
          <option value="outstanding">outstanding</option>
          <option value="waived">waived</option>
        </Select>
        {state?.errors?.status?.[0] ? <span className="text-red-600">{state.errors.status[0]}</span> : null}
      </Label>
      <Label className="sm:col-span-2">
        <span>Description</span>
        <Input name="description" />
      </Label>
      <div className="sm:col-span-2 flex gap-2">
        <Button disabled={pending} type="submit">{pending ? "Saving..." : "Save"}</Button>
        <Button variant="secondary" type="button" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
