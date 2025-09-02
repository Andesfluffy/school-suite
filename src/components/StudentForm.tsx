"use client";

import { useActionState } from "react";
import { useToast } from "@/components/ToastProvider";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

type Action = (formData: FormData) => Promise<{ success: boolean; id?: string; error?: string; errors?: Record<string, string[]> }>;

export default function StudentForm({
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
      toast.addToast({ title: "Saved", description: "Student saved successfully", variant: "success" });
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
          <option>graduated</option>
        </Select>
        {state?.errors?.status?.[0] ? <span className="text-red-600">{state.errors.status[0]}</span> : null}
      </Label>
      <Label>
        <span>Date of Birth</span>
        <Input type="date" name="dob" defaultValue={initial?.dob} />
        {state?.errors?.dob?.[0] ? <span className="text-red-600">{state.errors.dob[0]}</span> : null}
      </Label>
      <Label>
        <span>Photo URL</span>
        <Input name="photoUrl" defaultValue={initial?.photoUrl} />
        {state?.errors?.photoUrl?.[0] ? <span className="text-red-600">{state.errors.photoUrl[0]}</span> : null}
      </Label>
      <Label>
        <span>Guardian Name</span>
        <Input name="guardianName" defaultValue={initial?.guardian?.name} />
      </Label>
      <Label>
        <span>Guardian Phone</span>
        <Input name="guardianPhone" defaultValue={initial?.guardian?.phone} />
      </Label>
      <Label>
        <span>State of Origin</span>
        <Input name="stateOfOrigin" defaultValue={initial?.stateOfOrigin} />
      </Label>
      <Label>
        <span>Scholarship</span>
        <Input name="scholarship" defaultValue={initial?.scholarship} />
      </Label>
      <Label className="sm:col-span-2">
        <span>Medical Issues</span>
        <Input name="medicalIssues" defaultValue={initial?.medicalIssues?.join?.(", ")} />
      </Label>
      <Label className="sm:col-span-2">
        <span>Disabilities</span>
        <Input name="disabilities" defaultValue={initial?.disabilities?.join?.(", ")} />
      </Label>
      <Label className="sm:col-span-2">
        <span>Clubs/Associations</span>
        <Input name="clubs" defaultValue={initial?.clubs?.join?.(", ")} />
      </Label>
      <div className="sm:col-span-2 flex gap-2">
        <Button disabled={pending} type="submit">
          {pending ? "Saving..." : submitLabel}
        </Button>
        <Button variant="secondary" type="button" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  );
}
