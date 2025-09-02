import Link from "next/link";
import { listAcademicRecords, performanceDashboard } from "./actions";
import PageHeader from "@/components/PageHeader";

export default async function PerformancePage() {
  const [stats, records] = await Promise.all([
    performanceDashboard(),
    listAcademicRecords(),
  ]);
  return (
    <section className="space-y-6">
      <PageHeader title="Performance" subtitle="Track attendance, assessments, and CGPA across terms." />
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Performance</h1>
        <Link href="/performance/new" className="rounded bg-black text-white px-3 py-1 text-sm">Add Record</Link>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="border rounded p-4">
          <div className="text-gray-500">Records</div>
          <div className="text-xl font-semibold">{stats.count}</div>
        </div>
        <div className="border rounded p-4">
          <div className="text-gray-500">Avg Attendance</div>
          <div className="text-xl font-semibold">{stats.avgAttendance.toFixed(1)}%</div>
        </div>
        <div className="border rounded p-4">
          <div className="text-gray-500">Avg CGPA</div>
          <div className="text-xl font-semibold">{stats.avgCgpa.toFixed(2)}</div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2 border">Student</th>
              <th className="text-left p-2 border">Term</th>
              <th className="text-left p-2 border">Attendance</th>
              <th className="text-left p-2 border">Grade</th>
              <th className="text-left p-2 border">CGPA</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td className="p-2 border text-center" colSpan={5}>No records yet</td>
              </tr>
            ) : (
              records.map((r) => (
                <tr key={r.id}>
                  <td className="p-2 border">{(r as any).student?.name || r.studentId}</td>
                  <td className="p-2 border">{r.term}</td>
                  <td className="p-2 border">{r.attendance ?? "—"}</td>
                  <td className="p-2 border">{r.grade ?? "—"}</td>
                  <td className="p-2 border">{r.cgpa ?? "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
