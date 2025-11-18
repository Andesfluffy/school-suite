import Link from "next/link";
import { listStudents } from "./actions";
import StudentListClient from "@/components/StudentListClient";
import PageHeader from "@/components/PageHeader";

export default async function StudentsPage() {
  const students = await listStudents();
  const normalisedStudents = students.map((student) => {
    const rawGuardian = student.guardian;
    const guardian =
      rawGuardian && typeof rawGuardian === "object" && !Array.isArray(rawGuardian)
        ? {
            name:
              "name" in rawGuardian && rawGuardian.name !== null
                ? (rawGuardian as Record<string, unknown>).name?.toString()
                : undefined,
            phone:
              "phone" in rawGuardian && rawGuardian.phone !== null
                ? (rawGuardian as Record<string, unknown>).phone?.toString()
                : undefined,
          }
        : undefined;

    return {
      ...student,
      dob: student.dob ?? undefined,
      photoUrl: student.photoUrl ?? undefined,
      guardian,
      stateOfOrigin: student.stateOfOrigin ?? undefined,
      scholarship: student.scholarship ?? undefined,
      financialStatus: student.financialStatus ?? undefined,
      subjects: Array.isArray(student.subjects)
        ? (student.subjects as unknown[]).map((value) => String(value))
        : undefined,
      medicalIssues: Array.isArray(student.medicalIssues)
        ? (student.medicalIssues as unknown[]).map((value) => String(value))
        : undefined,
      disabilities: Array.isArray(student.disabilities)
        ? (student.disabilities as unknown[]).map((value) => String(value))
        : undefined,
      clubs: Array.isArray(student.clubs)
        ? (student.clubs as unknown[]).map((value) => String(value))
        : undefined,
      grades:
        student.grades && typeof student.grades === "object" && !Array.isArray(student.grades)
          ? (student.grades as Record<string, unknown>)
          : undefined,
      cgpa: student.cgpa ?? undefined,
      classOfDegree: student.classOfDegree ?? undefined,
    };
  });

  const total = normalisedStudents.length;
  const active = normalisedStudents.filter((student) => student.status === "active").length;
  const scholarships = normalisedStudents.filter((student) => Boolean(student.scholarship)).length;
  const sanctions = normalisedStudents.filter((student) => Boolean(student.sanction)).length;
  const averageCgpa = total
    ? normalisedStudents.reduce((sum, student) => sum + (Number(student.cgpa) || 0), 0) / total
    : 0;
  return (
    <section className="space-y-8">
      <PageHeader
        title="Students"
        subtitle="A refined directory covering biodata, guardians, scholarships, academics, and wellbeing signals."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[{
          label: "Total learners",
          value: total.toLocaleString(),
          detail: "Across all programmes",
        },
        {
          label: "Active",
          value: active.toLocaleString(),
          detail: "Currently enrolled",
        },
        {
          label: "Scholarships",
          value: scholarships.toLocaleString(),
          detail: "Awarded financial aid",
        },
        {
          label: "Average CGPA",
          value: averageCgpa ? averageCgpa.toFixed(2) : "—",
          detail: "Across recorded results",
        }].map((card) => (
          <div
            key={card.label}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/5 p-5"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-white/45">{card.label}</p>
            <p className="mt-3 text-2xl font-semibold text-white">{card.value}</p>
            <p className="mt-2 text-sm text-white/60">{card.detail}</p>
          </div>
        ))}
      </div>
      {sanctions ? (
        <div className="rounded-3xl border border-rose-500/25 bg-rose-500/10 p-4 text-sm text-rose-100">
          {sanctions} student{sanctions === 1 ? "" : "s"} currently have active sanctions logged.
        </div>
      ) : null}
      <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-[#0b0b0b]/70 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold text-white">Learner registry</h2>
          <p className="text-sm text-white/70">
            Filter by status, highlight scholarships, and surface wellbeing considerations before parent-teacher meetings.
          </p>
        </div>
        <Link
          href="/students/new"
          className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand-500)]"
        >
          Add student record
        </Link>
      </div>
      <StudentListClient students={normalisedStudents} />
    </section>
  );
}
