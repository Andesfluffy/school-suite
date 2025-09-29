import Link from "next/link";
import { getEvent, deleteEvent } from "../actions";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "2-digit",
});

function formatDate(value: string | null | undefined) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return {
    dateLabel: dateFormatter.format(date),
    timeLabel: timeFormatter.format(date),
    status: date.getTime() >= Date.now() ? "upcoming" : "past",
  } as const;
}

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id);

  if (!event) {
    return <div className="text-sm">Event not found.</div>;
  }

  const formatted = formatDate(event.date as string | undefined);

  return (
    <section className="space-y-6 max-w-3xl">
      <div className="card space-y-4 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{event.title}</h1>
            {formatted ? (
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                <span className="font-medium text-white">{formatted.dateLabel}</span>
                <span>•</span>
                <span>{formatted.timeLabel}</span>
                <Badge color={formatted.status === "upcoming" ? "green" : "blue"}>
                  {formatted.status === "upcoming" ? "Upcoming" : "Completed"}
                </Badge>
              </div>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Link href={`/events/${event.id}/edit`}>
              <Button variant="secondary">Edit</Button>
            </Link>
            <form action={deleteEvent.bind(null, event.id)}>
              <Button variant="danger">Delete</Button>
            </form>
          </div>
        </div>
        <div className="text-sm leading-relaxed text-white/80">
          {event.description ? event.description : "No description provided for this event."}
        </div>
        {Array.isArray(event.audience) && event.audience.length ? (
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white/40">Audience</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {event.audience.map((value) => (
                <span
                  key={value}
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/70"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
