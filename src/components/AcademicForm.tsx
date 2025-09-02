"use client";

import { useActionState } from "react";
import { useToast } from "@/components/ToastProvider";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

type Action = (formData: FormData) => Promise<{ success: boolean; id?: string; error?: string; errors?: Record<string, string[]> }>;

export default function AcademicForm({
  action,
  students,
  redirectTo,
}: {
  action: Action;
  students: { id: string; name: string }[];
  redirectTo: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(async (_prev: any, formData: FormData) => {
    const res = await action(formData);
    if (res.success) {
      toast.addToast({ title: "Saved", description: "Performance record added", variant: "success" });
      router.push(redirectTo);
      router.refresh();
    }
    return res;
  }, null as any);
  const toast = useToast();

  return (
    <form action={formAction} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      {state?.error ? <div className="sm:col-span-2 text-red-600">{state.error}</div> : null}
      <Label>
        <span>Student</span>
        <Select name="studentId">
          <option value="">Select a student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </Select>
        {state?.errors?.studentId?.[0] ? <span className="text-red-600">{state.errors.studentId[0]}</span> : null}
      </Label>
      <Label>
        <span>Term</span>
        <Input name="term" placeholder="e.g. 2024/2025 T1" />
        {state?.errors?.term?.[0] ? <span className="text-red-600">{state.errors.term[0]}</span> : null}
      </Label>
      <Label>
        <span>Attendance (%)</span>
        <Input name="attendance" type="number" step="1" min="0" max="100" />
        {state?.errors?.attendance?.[0] ? <span className="text-red-600">{state.errors.attendance[0]}</span> : null}
      </Label>
      <Label>
        <span>Grade</span>
        <Input name="grade" />
      </Label>
      <Label>
        <span>CGPA</span>
        <Input name="cgpa" type="number" step="0.01" min="0" max="5" />
        {state?.errors?.cgpa?.[0] ? <span className="text-red-600">{state.errors.cgpa[0]}</span> : null}
      </Label>
      <div className="sm:col-span-2 flex gap-2">
        <Button disabled={pending} type="submit">{pending ? "Saving..." : "Save"}</Button>
        <Button variant="secondary" type="button" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
