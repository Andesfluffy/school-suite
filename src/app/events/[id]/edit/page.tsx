import EventForm from "@/components/EventForm";
import { getEvent, updateEvent } from "../../actions";

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id);
  if (!event) {
    return <div className="text-sm">Event not found.</div>;
  }

  return (
    <section className="space-y-6 max-w-2xl">
      <h1 className="text-xl font-semibold">Edit Event</h1>
      <EventForm
        action={updateEvent.bind(null, event.id)}
        initial={{
          id: event.id,
          title: event.title,
          date: event.date as string | null,
          description: event.description as string | null,
          audience: Array.isArray(event.audience) ? (event.audience as string[]) : null,
        }}
        redirectTo={`/events/${event.id}`}
        submitLabel="Update"
      />
    </section>
  );
}
