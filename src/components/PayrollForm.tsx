"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Select from "@/components/ui/Select";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { useToast } from "@/components/ToastProvider";
import type { Option } from "@/components/LibraryAssetForm";

type Action = (formData: FormData) => Promise<{
  success: boolean;
  id?: string;
  error?: string;
  errors?: Record<string, string[]>;
}>;

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function PayrollForm({
  action,
  staff,
  redirectTo,
}: {
  action: Action;
  staff: Option[];
  redirectTo: string;
}) {
  const router = useRouter();
  const toast = useToast();
  const [state, formAction, pending] = useActionState(async (_prev: any, formData: FormData) => {
    const res = await action(formData);
    if (res.success) {
      toast.addToast({ title: "Payslip generated", description: "Payroll record saved", variant: "success" });
      router.push(redirectTo);
      router.refresh();
    }
    return res;
  }, null as any);

  return (
    <form action={formAction} className="grid grid-cols-1 gap-4">
      {state?.error ? <div className="text-sm text-red-500">{state.error}</div> : null}
      <Label>
        <span>Staff member</span>
        <Select name="staffId" defaultValue="">
          <option value="">Select staff</option>
          {staff.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </Select>
        {state?.errors?.staffId?.[0] ? <span className="text-red-500">{state.errors.staffId[0]}</span> : null}
      </Label>
      <div className="grid gap-4 sm:grid-cols-2">
        <Label>
          <span>Month</span>
          <Select name="month" defaultValue={String(new Date().getMonth() + 1)}>
            {monthNames.map((name, index) => (
              <option key={name} value={index + 1}>
                {name}
              </option>
            ))}
          </Select>
          {state?.errors?.month?.[0] ? <span className="text-red-500">{state.errors.month[0]}</span> : null}
        </Label>
        <Label>
          <span>Year</span>
          <Input name="year" defaultValue={String(new Date().getFullYear())} />
          {state?.errors?.year?.[0] ? <span className="text-red-500">{state.errors.year[0]}</span> : null}
        </Label>
      </div>
      <Label>
        <span>Gross pay (₦)</span>
        <Input name="grossPay" placeholder="320000" />
        {state?.errors?.grossPay?.[0] ? <span className="text-red-500">{state.errors.grossPay[0]}</span> : null}
      </Label>
      <div className="grid gap-4 sm:grid-cols-2">
        <Label>
          <span>Allowances</span>
          <Textarea
            name="allowances"
            placeholder="One per line, e.g. Housing:40000"
            className="min-h-[120px]"
          />
          {state?.errors?.allowances?.[0] ? <span className="text-red-500">{state.errors.allowances[0]}</span> : null}
        </Label>
        <Label>
          <span>Deductions</span>
          <Textarea
            name="deductions"
            placeholder="One per line, e.g. Tax:22000"
            className="min-h-[120px]"
          />
          {state?.errors?.deductions?.[0] ? <span className="text-red-500">{state.errors.deductions[0]}</span> : null}
        </Label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Label>
          <span>Status</span>
          <Select name="status" defaultValue="issued">
            <option value="draft">Draft</option>
            <option value="processed">Processed</option>
            <option value="issued">Issued</option>
            <option value="paid">Paid</option>
          </Select>
          {state?.errors?.status?.[0] ? <span className="text-red-500">{state.errors.status[0]}</span> : null}
        </Label>
        <Label>
          <span>Pay date</span>
          <Input type="date" name="payDate" />
          {state?.errors?.payDate?.[0] ? <span className="text-red-500">{state.errors.payDate[0]}</span> : null}
        </Label>
      </div>
      <Label>
        <span>Reference number</span>
        <Input name="reference" placeholder="SS-2024-07-0009" />
      </Label>
      <Label>
        <span>Notes</span>
        <Textarea name="notes" placeholder="Any special remarks for this payslip" className="min-h-[120px]" />
      </Label>
      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Generating..." : "Generate payslip"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
