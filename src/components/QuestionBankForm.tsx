"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { useToast } from "@/components/ToastProvider";
import type { Option } from "@/components/LibraryAssetForm";

type Action = (formData: FormData) => Promise<{
  success: boolean;
  id?: string;
  error?: string;
  errors?: Record<string, string[]>;
}>;

export default function QuestionBankForm({
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
      toast.addToast({ title: "Saved", description: "Question bank item added", variant: "success" });
      router.push(redirectTo);
      router.refresh();
    }
    return res;
  }, null as any);

  return (
    <form action={formAction} className="grid grid-cols-1 gap-4">
      {state?.error ? <div className="text-sm text-red-500">{state.error}</div> : null}
      <Label>
        <span>Title</span>
        <Input name="title" placeholder="e.g. Mid-Term Test: Algebraic Expressions" />
        {state?.errors?.title?.[0] ? <span className="text-red-500">{state.errors.title[0]}</span> : null}
      </Label>
      <div className="grid gap-4 sm:grid-cols-2">
        <Label>
          <span>Subject</span>
          <Input name="subject" placeholder="Mathematics" />
          {state?.errors?.subject?.[0] ? <span className="text-red-500">{state.errors.subject[0]}</span> : null}
        </Label>
        <Label>
          <span>Term / Session</span>
          <Input name="term" placeholder="2024/2025 · Term 1" />
        </Label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Label>
          <span>Grade level</span>
          <Input name="gradeLevel" placeholder="SS1" />
        </Label>
        <Label>
          <span>Assessment type</span>
          <Select name="examType" defaultValue="exam">
            <option value="exam">Exam</option>
            <option value="midterm">Mid-term test</option>
            <option value="ca">Continuous assessment</option>
            <option value="practice">Practice / mock</option>
          </Select>
        </Label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Label>
          <span>Total marks</span>
          <Input name="totalMarks" placeholder="100" />
          {state?.errors?.totalMarks?.[0] ? <span className="text-red-500">{state.errors.totalMarks[0]}</span> : null}
        </Label>
        <Label>
          <span>Duration (minutes)</span>
          <Input name="durationMinutes" placeholder="60" />
          {state?.errors?.durationMinutes?.[0] ? (
            <span className="text-red-500">{state.errors.durationMinutes[0]}</span>
          ) : null}
        </Label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Label>
          <span>Scheduled date</span>
          <Input type="date" name="scheduledDate" />
          {state?.errors?.scheduledDate?.[0] ? <span className="text-red-500">{state.errors.scheduledDate[0]}</span> : null}
        </Label>
        <Label>
          <span>Uploaded by</span>
          <Select name="uploaderId" defaultValue="">
            <option value="">Select staff (optional)</option>
            {staff.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </Select>
        </Label>
      </div>
      <Label>
        <span>Instructions / notes</span>
        <Textarea
          name="instructions"
          placeholder="E.g. Attempt all questions, calculators not allowed..."
          className="min-h-[140px]"
        />
      </Label>
      <Label>
        <span>File or link URL</span>
        <Input name="fileUrl" placeholder="https://" />
        {state?.errors?.fileUrl?.[0] ? <span className="text-red-500">{state.errors.fileUrl[0]}</span> : null}
      </Label>
      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save question set"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
