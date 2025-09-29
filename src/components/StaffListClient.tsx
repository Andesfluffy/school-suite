"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";

type StaffRecord = {
  id: string;
  name: string;
  status: string;
  role: string;
  dob?: string | null;
  phone?: string | null;
  stateOfOrigin?: string | null;
  disabilities?: unknown;
  rank?: string | null;
  salary?: number | null;
  subjects?: unknown;
  department?: string | null;
  sanction?: string | null;
  clubs?: unknown;
  qualification?: string | null;
};

type ViewMode = "cards" | "table";

function normaliseArray(value: unknown) {
  if (!value) return [] as string[];
  if (Array.isArray(value)) {
    return value.map((entry) => (typeof entry === "string" ? entry.trim() : "")).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }
  return [] as string[];
}

function formatStatusTone(status: string) {
  switch (status) {
    case "active":
      return "green" as const;
    case "retired":
      return "blue" as const;
    case "suspended":
      return "red" as const;
    default:
      return "gray" as const;
  }
}

export default function StaffListClient({ staff }: { staff: StaffRecord[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [role, setRole] = useState("all");
  const [view, setView] = useState<ViewMode>("cards");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return staff.filter((member) => {
      const matchesQuery = q
        ? [
            member.name,
            member.department ?? "",
            member.rank ?? "",
            normaliseArray(member.subjects).join(" "),
            normaliseArray(member.clubs).join(" "),
          ]
            .join(" ")
            .toLowerCase()
            .includes(q)
        : true;
      const matchesStatus = status === "all" ? true : member.status === status;
      const matchesRole = role === "all" ? true : member.role === role;
      return matchesQuery && matchesStatus && matchesRole;
    });
  }, [staff, query, status, role]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Search by name, department, subject, or club…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="min-w-[240px] flex-1 sm:flex-none"
        />
        <Select value={status} onChange={(event) => setStatus(event.target.value)} className="bg-white/5 text-white">
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
          <option value="retired">Retired</option>
        </Select>
        <Select value={role} onChange={(event) => setRole(event.target.value)} className="bg-white/5 text-white">
          <option value="all">All roles</option>
          <option value="academic">Academic</option>
          <option value="admin">Admin</option>
        </Select>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-xs uppercase tracking-[0.24em]">
          <button
            type="button"
            onClick={() => setView("cards")}
            className={`rounded-full px-3 py-1 transition ${
              view === "cards" ? "bg-white text-black shadow" : "text-white/60 hover:text-white"
            }`}
          >
            Cards
          </button>
          <button
            type="button"
            onClick={() => setView("table")}
            className={`rounded-full px-3 py-1 transition ${
              view === "table" ? "bg-white text-black shadow" : "text-white/60 hover:text-white"
            }`}
          >
            Ledger
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card border border-white/10 bg-white/5 p-6 text-sm text-white/70">
          <p className="text-base font-semibold text-white">No staff members match these filters.</p>
          <p className="mt-1">Update the search or onboard personnel to populate the directory.</p>
        </div>
      ) : view === "cards" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((member) => {
            const subjects = normaliseArray(member.subjects);
            const clubs = normaliseArray(member.clubs);
            const disabilities = normaliseArray(member.disabilities);
            return (
              <article
                key={member.id}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-6 transition hover:border-[var(--brand)]/60 hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link href={`/staff/${member.id}`} className="text-lg font-semibold text-white transition group-hover:text-[var(--brand-400)]">
                      {member.name}
                    </Link>
                    <div className="mt-1 text-sm text-white/60">{member.department || "Department pending"}</div>
                  </div>
                  <Badge color={formatStatusTone(member.status)}>{member.status}</Badge>
                </div>

                <div className="grid gap-3 text-sm text-white/70">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/60">Role</span>
                    <span className="text-right text-white capitalize">{member.role}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/60">Rank</span>
                    <span className="text-right text-white">{member.rank || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/60">Salary</span>
                    <span className="text-right text-white">{member.salary != null ? member.salary.toLocaleString() : "—"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/60">Qualification</span>
                    <span className="text-right text-white">{member.qualification || "—"}</span>
                  </div>
                  {member.phone ? (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white/60">Phone</span>
                      <a className="text-right text-[var(--brand-200)] hover:text-[var(--brand)]" href={`tel:${member.phone}`}>
                        {member.phone}
                      </a>
                    </div>
                  ) : null}
                  {member.sanction ? (
                    <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-rose-100">
                      {member.sanction}
                    </div>
                  ) : null}
                </div>

                {[subjects, clubs, disabilities].some((collection) => collection.length) ? (
                  <div className="flex flex-wrap gap-2 text-xs text-white/65">
                    {subjects.map((subject) => (
                      <span key={`subject-${subject}`} className="rounded-full border border-white/15 bg-white/10 px-2 py-1">
                        {subject}
                      </span>
                    ))}
                    {clubs.map((club) => (
                      <span key={`club-${club}`} className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2 py-1 text-sky-100">
                        {club}
                      </span>
                    ))}
                    {disabilities.map((item) => (
                      <span key={`disability-${item}`} className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-1 text-amber-100">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>{member.dob ? new Date(member.dob).toLocaleDateString() : "Date of birth pending"}</span>
                  <Link href={`/staff/${member.id}/edit`} className="font-medium text-[var(--brand-200)] hover:text-[var(--brand)]">
                    Edit profile ↗
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40">
          <table className="min-w-full divide-y divide-white/10 text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.28em] text-white/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Staff</th>
                <th className="px-4 py-3 text-left font-medium">Role</th>
                <th className="px-4 py-3 text-left font-medium">Department</th>
                <th className="px-4 py-3 text-left font-medium">Rank</th>
                <th className="px-4 py-3 text-left font-medium">Salary</th>
                <th className="px-4 py-3 text-left font-medium">Contact</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/80">
              {filtered.map((member) => (
                <tr key={member.id} className="hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">
                      <Link href={`/staff/${member.id}`}>{member.name}</Link>
                    </div>
                    <div className="mt-1">
                      <Badge color={formatStatusTone(member.status)}>{member.status}</Badge>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize">{member.role}</td>
                  <td className="px-4 py-3">{member.department || "—"}</td>
                  <td className="px-4 py-3">{member.rank || "—"}</td>
                  <td className="px-4 py-3">{member.salary != null ? member.salary.toLocaleString() : "—"}</td>
                  <td className="px-4 py-3">
                    {member.phone ? <div>{member.phone}</div> : <span>—</span>}
                    {member.stateOfOrigin ? (
                      <div className="text-xs text-white/60">{member.stateOfOrigin}</div>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/staff/${member.id}/edit`} className="text-[var(--brand-200)] hover:text-[var(--brand)]">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

