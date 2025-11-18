"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ToastProvider";

function formatForInput(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

type ActionResult = {
  success: boolean;
  id?: string;
  error?: string;
  errors?: Record<string, string[]>;
};

type Action = (formData: FormData) => Promise<ActionResult>;

type EventFormProps = {
  action: Action;
  initial?: {
    id?: string;
    title?: string;
    date?: string | null;
    description?: string | null;
    audience?: string[] | null;
  };
  redirectTo: string;
  submitLabel?: string;
};

export default function EventForm({ action, initial, redirectTo, submitLabel = "Save" }: EventFormProps) {
  const router = useRouter();
  const toast = useToast();
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(async (_prev, formData) => {
    const response = await action(formData);
    if (response.success) {
      toast.addToast({ title: "Saved", description: "Event saved successfully", variant: "success" });
      router.push(redirectTo.replace(":id", response.id || ""));
      router.refresh();
    }
    return response;
  }, null);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error ? <div className="text-sm text-red-500">{state.error}</div> : null}
      <Label>
        <span>Title</span>
        <Input name="title" defaultValue={initial?.title} placeholder="Ceremony, fixture, or announcement" />
        {state?.errors?.title?.[0] ? <span className="text-red-500">{state.errors.title[0]}</span> : null}
      </Label>
      <Label>
        <span>Date &amp; time</span>
        <Input type="datetime-local" name="date" defaultValue={formatForInput(initial?.date)} />
        {state?.errors?.date?.[0] ? <span className="text-red-500">{state.errors.date[0]}</span> : null}
      </Label>
      <Label>
        <span>Description</span>
        <textarea
          name="description"
          defaultValue={initial?.description ?? ""}
          placeholder="Context, objectives, dress code, or logistics"
          rows={3}
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/60 outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]"
        />
        {state?.errors?.description?.[0] ? <span className="text-red-500">{state.errors.description[0]}</span> : null}
      </Label>
      <Label>
        <span>Audience</span>
        <Input
          name="audience"
          defaultValue={Array.isArray(initial?.audience) ? initial.audience.join(", ") : ""}
          placeholder="Students, Guardians, Teachers"
        />
        <span className="text-xs text-white/50">Separate multiple audiences with commas.</span>
        {state?.errors?.audience?.[0] ? <span className="text-red-500">{state.errors.audience[0]}</span> : null}
      </Label>
      <div className="flex gap-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
