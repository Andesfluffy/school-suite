import { listAcademicRecords, performanceDashboard } from "./actions";
import type { AcademicRecordWithStudent } from "./actions";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default async function PerformancePage() {
  const [stats, records]: [
    Awaited<ReturnType<typeof performanceDashboard>>,
    AcademicRecordWithStudent[],
  ] = await Promise.all([
    performanceDashboard(),
    listAcademicRecords(),
  ]);
  const byTerm = records.reduce<Record<string, { count: number; avgCgpa: number; avgAttendance: number }>>((acc, record) => {
    const entry = acc[record.term] ?? { count: 0, avgCgpa: 0, avgAttendance: 0 };
    entry.count += 1;
    entry.avgCgpa += record.cgpa ?? 0;
    entry.avgAttendance += record.attendance ?? 0;
    acc[record.term] = entry;
    return acc;
  }, {});
  const termInsights = Object.entries(byTerm).map(([term, value]) => ({
    term,
    avgCgpa: value.count ? value.avgCgpa / value.count : 0,
    avgAttendance: value.count ? value.avgAttendance / value.count : 0,
    count: value.count,
  }));
  const bestTerm = termInsights.sort((a, b) => (b.avgCgpa || 0) - (a.avgCgpa || 0))[0];
  const topAttendance = records
    .filter((record) => record.attendance != null)
    .sort((a, b) => (b.attendance ?? 0) - (a.attendance ?? 0))
    .slice(0, 3);
  const topCgpa = records
    .filter((record) => record.cgpa != null)
    .sort((a, b) => (b.cgpa ?? 0) - (a.cgpa ?? 0))
    .slice(0, 3);
  return (
    <section className="space-y-8">
      <PageHeader
        title="Performance"
        subtitle="Blend attendance, assessments, and CGPA to surface where intervention or celebration is required."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[{
          label: "Recorded entries",
          value: stats.count.toLocaleString(),
          detail: "Assessments captured",
        },
        {
          label: "Average attendance",
          value: `${stats.avgAttendance.toFixed(1)}%`,
          detail: "Across all submissions",
        },
        {
          label: "Average CGPA",
          value: stats.avgCgpa.toFixed(2),
          detail: "Current academic pulse",
        },
        {
          label: "Best performing term",
          value: bestTerm ? bestTerm.term : "—",
          detail: bestTerm
            ? `${bestTerm.avgCgpa.toFixed(2)} CGPA · ${bestTerm.avgAttendance.toFixed(0)}% attendance`
            : "Awaiting records",
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
      <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-[#0b0b0b]/70 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold text-white">Academic performance cockpit</h2>
          <p className="text-sm text-white/70">
            Drill into top achievers, attendance anomalies, and grade distributions across sessions and terms.
          </p>
        </div>
        <Link
          href="/performance/new"
          className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand-500)]"
        >
          Log assessment
        </Link>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.2fr,1fr]">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-white">Latest records</h3>
            <span className="text-xs uppercase tracking-[0.28em] text-white/45">Term snapshots</span>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-[0.28em] text-white/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Student</th>
                  <th className="px-4 py-3 text-left font-medium">Term</th>
                  <th className="px-4 py-3 text-left font-medium">Attendance</th>
                  <th className="px-4 py-3 text-left font-medium">Grade</th>
                  <th className="px-4 py-3 text-left font-medium">CGPA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white/80">
                {records.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-center text-sm text-white/60" colSpan={5}>
                      No records yet. Start logging assessments to unlock performance analytics.
                    </td>
                  </tr>
                ) : (
                  records.map((record) => (
                    <tr key={record.id} className="hover:bg-white/5">
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{record.student?.name ?? record.studentId}</div>
                        <div className="text-xs text-white/60">ID: {record.studentId}</div>
                      </td>
                      <td className="px-4 py-3">{record.term}</td>
                      <td className="px-4 py-3">{record.attendance != null ? `${record.attendance.toFixed(1)}%` : "—"}</td>
                      <td className="px-4 py-3">{record.grade ?? "—"}</td>
                      <td className="px-4 py-3">{record.cgpa != null ? record.cgpa.toFixed(2) : "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-display text-lg font-semibold text-white">Top attendance</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {topAttendance.length === 0 ? (
                <li className="text-white/60">Awaiting submissions</li>
              ) : (
                topAttendance.map((record) => (
                  <li key={`attendance-${record.id}`} className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium text-white">{record.student?.name ?? record.studentId}</div>
                      <div className="text-xs text-white/60">{record.term}</div>
                    </div>
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-100">
                      {record.attendance?.toFixed(1)}%
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-display text-lg font-semibold text-white">Highest CGPA</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {topCgpa.length === 0 ? (
                <li className="text-white/60">Awaiting results</li>
              ) : (
                topCgpa.map((record) => (
                  <li key={`cgpa-${record.id}`} className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-medium text-white">{record.student?.name ?? record.studentId}</div>
                      <div className="text-xs text-white/60">{record.term}</div>
                    </div>
                    <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-sm text-sky-100">
                      {record.cgpa?.toFixed(2)}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
