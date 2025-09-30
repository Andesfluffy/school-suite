"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { useToast } from "@/components/ToastProvider";

export interface Option {
  id: string;
  name: string;
}

type Action = (formData: FormData) => Promise<{
  success: boolean;
  id?: string;
  error?: string;
  errors?: Record<string, string[]>;
}>;

export default function LibraryAssetForm({
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
      toast.addToast({ title: "Uploaded", description: "Library asset saved", variant: "success" });
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
        <Input name="title" placeholder="e.g. SS2 Physics – Electromagnetic Induction" />
        {state?.errors?.title?.[0] ? <span className="text-red-500">{state.errors.title[0]}</span> : null}
      </Label>
      <div className="grid gap-4 sm:grid-cols-2">
        <Label>
          <span>Subject</span>
          <Input name="subject" placeholder="Physics" />
          {state?.errors?.subject?.[0] ? <span className="text-red-500">{state.errors.subject[0]}</span> : null}
        </Label>
        <Label>
          <span>Level / Class</span>
          <Input name="level" placeholder="SS2" />
        </Label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Label>
          <span>Resource type</span>
          <Select name="resourceType" defaultValue="lecture_note">
            <option value="lecture_note">Lecture note</option>
            <option value="scheme_of_work">Scheme of work</option>
            <option value="reading">Supplementary reading</option>
            <option value="past_question">Past question</option>
            <option value="media">Audio / video</option>
          </Select>
          {state?.errors?.resourceType?.[0] ? <span className="text-red-500">{state.errors.resourceType[0]}</span> : null}
        </Label>
        <Label>
          <span>Format</span>
          <Select name="format" defaultValue="pdf">
            <option value="pdf">PDF</option>
            <option value="docx">Word document</option>
            <option value="presentation">Presentation</option>
            <option value="spreadsheet">Spreadsheet</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="link">External link</option>
          </Select>
          {state?.errors?.format?.[0] ? <span className="text-red-500">{state.errors.format[0]}</span> : null}
        </Label>
      </div>
      <Label>
        <span>Description</span>
        <Textarea name="description" placeholder="What is included in this material?" />
      </Label>
      <Label>
        <span>File or link URL</span>
        <Input name="fileUrl" placeholder="https://" />
        {state?.errors?.fileUrl?.[0] ? <span className="text-red-500">{state.errors.fileUrl[0]}</span> : null}
      </Label>
      <Label>
        <span>Tags (comma separated)</span>
        <Input name="tags" placeholder="STEM, Senior Secondary" />
      </Label>
      <div className="grid gap-4 sm:grid-cols-2">
        <Label>
          <span>Published date</span>
          <Input type="date" name="publishedAt" />
          {state?.errors?.publishedAt?.[0] ? <span className="text-red-500">{state.errors.publishedAt[0]}</span> : null}
        </Label>
        <Label>
          <span>Uploaded by</span>
          <Select name="uploaderId" defaultValue="">
            <option value="">Select staff member (optional)</option>
            {staff.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </Select>
        </Label>
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Uploading..." : "Save asset"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
