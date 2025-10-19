"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Badge from "@/components/ui/Badge";
import type { Student } from "@/lib/mock-data";

type StudentRecord = Pick<
  Student,
  | "id"
  | "name"
  | "status"
  | "dob"
  | "photoUrl"
  | "guardian"
  | "stateOfOrigin"
  | "scholarship"
  | "financialStatus"
  | "medicalIssues"
  | "disabilities"
  | "sanction"
  | "clubs"
  | "cgpa"
  | "classOfDegree"
>;

type ViewMode = "gallery" | "table";

function normaliseArray(value: string[] | null | undefined | string): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
      .filter(Boolean);
  }
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function extractGuardian(value: StudentRecord["guardian"]) {
  if (!value || typeof value !== "object") return { name: "—", phone: undefined as string | undefined };
  return {
    name: typeof value.name === "string" && value.name.trim() ? value.name : "—",
    phone: typeof value.phone === "string" && value.phone.trim() ? value.phone : undefined,
  };
}

function formatStatusTone(status: StudentRecord["status"]) {
  switch (status) {
    case "active":
      return "green" as const;
    case "graduated":
      return "blue" as const;
    case "suspended":
      return "red" as const;
    default:
      return "gray" as const;
  }
}

export default function StudentListClient({ students }: { students: StudentRecord[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [view, setView] = useState<ViewMode>("gallery");

  const filtered = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();
    return students.filter((student) => {
      const matchesQuery = normalisedQuery
        ? [
            student.name,
            student.stateOfOrigin ?? "",
            student.scholarship ?? "",
            student.financialStatus ?? "",
            normaliseArray(student.clubs).join(" "),
            normaliseArray(student.disabilities).join(" "),
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalisedQuery)
        : true;
      const matchesStatus = status === "all" ? true : student.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [students, query, status]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="Search by name, club, scholarship, or state…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="min-w-[240px] flex-1 sm:flex-none"
        />
        <Select value={status} onChange={(event) => setStatus(event.target.value)} className="bg-white/5 text-white">
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
          <option value="graduated">Graduated</option>
        </Select>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-xs uppercase tracking-[0.24em]">
          <button
            type="button"
            onClick={() => setView("gallery")}
            className={`rounded-full px-3 py-1 transition ${
              view === "gallery" ? "bg-white text-black shadow" : "text-white/60 hover:text-white"
            }`}
          >
            Gallery
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
          <p className="text-base font-semibold text-white">No student records match these filters.</p>
          <p className="mt-1">Adjust your search criteria or onboard a new learner to populate the directory.</p>
        </div>
      ) : view === "gallery" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((student) => {
            const guardian = extractGuardian(student.guardian);
            const clubs = normaliseArray(student.clubs);
            const medical = normaliseArray(student.medicalIssues);
            const disabilities = normaliseArray(student.disabilities);
            return (
              <article
                key={student.id}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-6 transition hover:border-[var(--brand)]/60 hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link href={`/students/${student.id}`} className="text-lg font-semibold text-white transition group-hover:text-[var(--brand-400)]">
                      {student.name}
                    </Link>
                    <div className="mt-1 text-sm text-white/60">{student.stateOfOrigin || "State not set"}</div>
                  </div>
                  <Badge color={formatStatusTone(student.status)}>{student.status}</Badge>
                </div>

                <div className="grid gap-3 text-sm text-white/70">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/60">Guardian</span>
                    <span className="text-right text-white">{guardian.name}</span>
                  </div>
                  {guardian.phone ? (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white/60">Guardian line</span>
                      <a className="text-right text-[var(--brand-200)] hover:text-[var(--brand)]" href={`tel:${guardian.phone}`}>
                        {guardian.phone}
                      </a>
                    </div>
                  ) : null}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/60">Scholarship</span>
                    <span className="text-right text-white">{student.scholarship || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/60">Financial status</span>
                    <span className="text-right text-white">{student.financialStatus || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/60">CGPA</span>
                    <span className="text-right text-white">{student.cgpa != null ? student.cgpa.toFixed(2) : "—"}</span>
                  </div>
                  {student.classOfDegree ? (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white/60">Class of degree</span>
                      <span className="text-right text-white">{student.classOfDegree}</span>
                    </div>
                  ) : null}
                  {student.sanction ? (
                    <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-rose-100">
                      {student.sanction}
                    </div>
                  ) : null}
                </div>

                {[clubs, medical, disabilities].some((collection) => collection.length) ? (
                  <div className="flex flex-wrap gap-2 text-xs text-white/65">
                    {clubs.map((club) => (
                      <span key={`club-${club}`} className="rounded-full border border-white/15 bg-white/10 px-2 py-1">
                        {club}
                      </span>
                    ))}
                    {medical.map((item) => (
                      <span key={`medical-${item}`} className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-1 text-amber-100">
                        {item}
                      </span>
                    ))}
                    {disabilities.map((item) => (
                      <span key={`disability-${item}`} className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2 py-1 text-sky-100">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="flex items-center justify-between text-xs text-white/50">
                  <span>{student.dob ? new Date(student.dob).toLocaleDateString() : "Date of birth pending"}</span>
                  <Link href={`/students/${student.id}/edit`} className="font-medium text-[var(--brand-200)] hover:text-[var(--brand)]">
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
                <th className="px-4 py-3 text-left font-medium">Student</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Scholarship</th>
                <th className="px-4 py-3 text-left font-medium">Financial</th>
                <th className="px-4 py-3 text-left font-medium">CGPA</th>
                <th className="px-4 py-3 text-left font-medium">Guardian</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/80">
              {filtered.map((student) => {
                const guardian = extractGuardian(student.guardian);
                return (
                  <tr key={student.id} className="hover:bg-white/5">
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">
                        <Link href={`/students/${student.id}`}>{student.name}</Link>
                      </div>
                      <div className="text-xs text-white/60">{student.stateOfOrigin || "—"}</div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge color={formatStatusTone(student.status)}>{student.status}</Badge>
                    </td>
                    <td className="px-4 py-3">{student.scholarship || "—"}</td>
                    <td className="px-4 py-3">{student.financialStatus || "—"}</td>
                    <td className="px-4 py-3">{student.cgpa != null ? student.cgpa.toFixed(2) : "—"}</td>
                    <td className="px-4 py-3">
                      <div>{guardian.name}</div>
                      {guardian.phone ? <div className="text-xs text-white/60">{guardian.phone}</div> : null}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/students/${student.id}/edit`} className="text-[var(--brand-200)] hover:text-[var(--brand)]">
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

