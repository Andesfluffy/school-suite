import { prisma } from "@/lib/db";

export default async function StudentPerformance({ params }: { params: { id: string } }) {
  const records = await prisma.academicRecord.findMany({ where: { studentId: params.id }, orderBy: { createdAt: "desc" } });
  return (
    <section className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2 border">Term</th>
              <th className="text-left p-2 border">Attendance</th>
              <th className="text-left p-2 border">Grade</th>
              <th className="text-left p-2 border">CGPA</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr><td className="p-2 border text-center" colSpan={4}>No records</td></tr>
            ) : records.map((r) => (
              <tr key={r.id}>
                <td className="p-2 border">{r.term}</td>
                <td className="p-2 border">{r.attendance ?? "—"}</td>
                <td className="p-2 border">{r.grade ?? "—"}</td>
                <td className="p-2 border">{r.cgpa ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

