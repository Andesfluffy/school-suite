"use client";

import { useActionState } from "react";
import { useToast } from "@/components/ToastProvider";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

type Action = (formData: FormData) => Promise<{ success: boolean; id?: string; error?: string; errors?: Record<string, string[]> }>;

export default function StaffForm({
  action,
  initial,
  redirectTo,
  submitLabel = "Save",
}: {
  action: Action;
  initial?: Record<string, any>;
  redirectTo: string;
  submitLabel?: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(async (_prev: any, formData: FormData) => {
    const res = await action(formData);
    if (res.success) {
      toast.addToast({ title: "Saved", description: "Staff saved successfully", variant: "success" });
      router.push(redirectTo.replace(":id", res.id || ""));
      router.refresh();
    }
    return res;
  }, null as any);
  const toast = useToast();

  return (
    <form action={formAction} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {state?.error ? (
        <div className="sm:col-span-2 text-sm text-red-600">{state.error}</div>
      ) : null}
      <Label>
        <span>Name</span>
        <Input name="name" defaultValue={initial?.name} />
        {state?.errors?.name?.[0] ? <span className="text-red-600">{state.errors.name[0]}</span> : null}
      </Label>
      <Label>
        <span>Status</span>
        <Select name="status" defaultValue={initial?.status || "active"}>
          <option>active</option>
          <option>inactive</option>
          <option>suspended</option>
          <option>retired</option>
        </Select>
        {state?.errors?.status?.[0] ? <span className="text-red-600">{state.errors.status[0]}</span> : null}
      </Label>
      <Label>
        <span>Date of Birth</span>
        <Input type="date" name="dob" defaultValue={initial?.dob} />
      </Label>
      <Label>
        <span>Phone Number</span>
        <Input name="phone" defaultValue={initial?.phone} />
      </Label>
      <Label>
        <span>Photo URL</span>
        <Input name="photoUrl" defaultValue={initial?.photoUrl} />
        {state?.errors?.photoUrl?.[0] ? <span className="text-red-600">{state.errors.photoUrl[0]}</span> : null}
      </Label>
      <Label>
        <span>State of Origin</span>
        <Input name="stateOfOrigin" defaultValue={initial?.stateOfOrigin} />
      </Label>
      <Label>
        <span>Disabilities</span>
        <Input name="disabilities" defaultValue={initial?.disabilities?.join?.(", ")} />
      </Label>
      <Label>
        <span>Rank</span>
        <Input name="rank" defaultValue={initial?.rank} />
      </Label>
      <Label>
        <span>Salary (Monthly)</span>
        <Input type="number" step="0.01" name="salary" defaultValue={initial?.salary} />
        {state?.errors?.salary?.[0] ? <span className="text-red-600">{state.errors.salary[0]}</span> : null}
      </Label>
      <Label>
        <span>Role</span>
        <Select name="role" defaultValue={initial?.role || "academic"}>
          <option value="academic">Academic</option>
          <option value="admin">Admin</option>
        </Select>
        {state?.errors?.role?.[0] ? <span className="text-red-600">{state.errors.role[0]}</span> : null}
      </Label>
      <Label>
        <span>Subjects/Courses</span>
        <Input name="subjects" defaultValue={initial?.subjects?.join?.(", ")} />
      </Label>
      <Label>
        <span>Department</span>
        <Input name="department" defaultValue={initial?.department} />
      </Label>
      <Label>
        <span>Sanction</span>
        <Input name="sanction" defaultValue={initial?.sanction} />
      </Label>
      <Label>
        <span>Clubs/Associations</span>
        <Input name="clubs" defaultValue={initial?.clubs?.join?.(", ")} />
      </Label>
      <Label className="sm:col-span-2">
        <span>Qualification</span>
        <Input name="qualification" defaultValue={initial?.qualification} />
      </Label>
      <div className="sm:col-span-2 flex gap-2">
        <Button disabled={pending} type="submit">{pending ? "Saving..." : submitLabel}</Button>
        <Button variant="secondary" type="button" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
