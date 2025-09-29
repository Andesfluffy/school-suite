import Link from "next/link";
import { listEvents } from "./actions";
import PageHeader from "@/components/PageHeader";
import EventListClient, { type EventRecord } from "@/components/EventListClient";

export default async function EventsPage() {
  const events = await listEvents();
  const records: EventRecord[] = events.map((event) => ({
    id: event.id,
    title: event.title,
    date: event.date as string,
    description: event.description as string | null | undefined,
    audience: Array.isArray(event.audience) ? (event.audience as string[]) : null,
  }));

  return (
    <section className="space-y-6">
      <PageHeader title="Events" subtitle="Schedule school events and track important dates." />
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Events</h1>
        <Link
          href="/events/new"
          className="rounded bg-black text-white px-3 py-1 text-sm hover:bg-black/80"
        >
          Schedule Event
        </Link>
      </header>
      <EventListClient events={records} />
    </section>
  );
}
