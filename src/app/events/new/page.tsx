import EventForm from "@/components/EventForm";
import { createEvent } from "../actions";

export default function NewEventPage() {
  return (
    <section className="space-y-6 max-w-2xl">
      <h1 className="text-xl font-semibold">Schedule Event</h1>
      <EventForm action={createEvent} redirectTo="/events" submitLabel="Schedule" />
    </section>
  );
}
