"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";

export type EventRecord = {
  id: string;
  title: string;
  date: string;
  description?: string | null;
  audience?: string[] | null;
};

type TimelineEvent = EventRecord & {
  dateObject: Date;
  dateLabel: string;
  timeLabel: string;
  relative: string;
  status: "upcoming" | "past";
};

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "2-digit",
});

const relativeFormatter = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

function formatRelative(date: Date) {
  const now = Date.now();
  const diff = date.getTime() - now;
  const minutes = Math.round(diff / (1000 * 60));
  if (Math.abs(minutes) < 60) {
    return relativeFormatter.format(minutes, "minute");
  }
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) {
    return relativeFormatter.format(hours, "hour");
  }
  const days = Math.round(hours / 24);
  if (Math.abs(days) < 30) {
    return relativeFormatter.format(days, "day");
  }
  const months = Math.round(days / 30);
  return relativeFormatter.format(months, "month");
}

function normaliseEvent(record: EventRecord): TimelineEvent | null {
  const dateObject = new Date(record.date);
  if (Number.isNaN(dateObject.getTime())) {
    return null;
  }
  const status = dateObject.getTime() >= Date.now() ? "upcoming" : "past";
  return {
    ...record,
    dateObject,
    status,
    dateLabel: dateFormatter.format(dateObject),
    timeLabel: timeFormatter.format(dateObject),
    relative: formatRelative(dateObject),
  };
}

function getAudienceOptions(events: TimelineEvent[]) {
  const entries = new Set<string>();
  for (const event of events) {
    for (const value of event.audience ?? []) {
      entries.add(value);
    }
  }
  return Array.from(entries.values()).sort();
}

export default function EventListClient({ events }: { events: EventRecord[] }) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"upcoming" | "past" | "all">("upcoming");
  const [audience, setAudience] = useState("all");

  const timelineEvents = useMemo(() => {
    return events
      .map(normaliseEvent)
      .filter((value): value is TimelineEvent => Boolean(value))
      .sort((a, b) => a.dateObject.getTime() - b.dateObject.getTime());
  }, [events]);

  const audienceOptions = useMemo(() => getAudienceOptions(timelineEvents), [timelineEvents]);

  const filtered = useMemo(() => {
    const queryLower = query.trim().toLowerCase();
    return timelineEvents.filter((event) => {
      if (view !== "all" && event.status !== view) {
        return false;
      }
      if (audience !== "all") {
        if (!event.audience?.some((value) => value === audience)) {
          return false;
        }
      }
      if (!queryLower) {
        return true;
      }
      const haystack = [event.title, event.description ?? "", (event.audience ?? []).join(" ")]
        .join(" ")
        .toLowerCase();
      return haystack.includes(queryLower);
    });
  }, [timelineEvents, query, view, audience]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 text-sm">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search title, audience, or description"
          className="min-w-[220px]"
        />
        <Select value={view} onChange={(event) => setView(event.target.value as typeof view)}>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
          <option value="all">All</option>
        </Select>
        <Select value={audience} onChange={(event) => setAudience(event.target.value)}>
          <option value="all">All audiences</option>
          {audienceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="card p-6 text-sm text-white/70">
            <p className="font-medium text-white">No events yet.</p>
            <p className="mt-1">
              Adjust your filters or schedule a new event to populate the communications timeline.
            </p>
          </div>
        ) : (
          <ol className="space-y-4">
            {filtered.map((event) => (
              <li key={event.id} className="relative">
                <Link
                  href={`/events/${event.id}`}
                  className="group block rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[var(--brand)]/60 hover:bg-white/10"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-semibold text-white group-hover:text-[var(--brand-500)]">
                          {event.title}
                        </h2>
                        <Badge color={event.status === "upcoming" ? "green" : "blue"}>{event.relative}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-white/70 leading-relaxed">
                        {event.description || "No description provided."}
                      </p>
                      {event.audience?.length ? (
                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/60">
                          {event.audience.map((value) => (
                            <span
                              key={value}
                              className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2 py-1"
                            >
                              {value}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    <div className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-right text-sm text-white/80">
                      <div className="font-semibold text-white">{event.dateLabel}</div>
                      <div>{event.timeLabel}</div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
