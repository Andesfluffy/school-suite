import Link from "next/link";
import { getStudent, deleteStudent } from "../actions";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";

export default async function StudentDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const student = await getStudent(id);
  if (!student) {
    return <div className="text-sm">Student not found.</div>;
  }

  const rawGuardian = student.guardian;
  const guardian =
    rawGuardian && typeof rawGuardian === "object" && !Array.isArray(rawGuardian)
      ? {
          name:
            "name" in rawGuardian && rawGuardian.name !== null
              ? (rawGuardian as Record<string, unknown>).name?.toString()
              : undefined,
        }
      : undefined;
  const clubs = Array.isArray(student.clubs) ? student.clubs.map((value) => String(value)) : null;
  const medicalIssues = Array.isArray(student.medicalIssues)
    ? student.medicalIssues.map((value) => String(value))
    : null;

  return (
    <section className="space-y-4">
      <div className="card p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={student.name} src={student.photoUrl ?? undefined} size={72} />
          <div>
            <div className="text-xl font-semibold">{student.name}</div>
            <div className="mt-1">
              <Badge color={student.status === "active" ? "green" : student.status === "suspended" ? "red" : "gray"}>{student.status}</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2 text-sm">
          <Link href={`/students/${student.id}/edit`}><Button variant="secondary">Edit</Button></Link>
          <form action={deleteStudent.bind(null, student.id)}>
            <Button variant="danger">Delete</Button>
          </form>
        </div>
      </div>
      <Tabs items={[
        { href: `/students/${student.id}`, label: "Overview" },
        { href: `/students/${student.id}/financials`, label: "Financials" },
        { href: `/students/${student.id}/performance`, label: "Performance" },
        { href: `/students/${student.id}/notes`, label: "Notes" },
      ]} />
      <div className="card p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
        <div><span className="text-gray-500">Status:</span> {student.status}</div>
        <div><span className="text-gray-500">DOB:</span> {student.dob || "—"}</div>
        <div><span className="text-gray-500">Guardian:</span> {guardian?.name || "—"}</div>
        <div><span className="text-gray-500">State of Origin:</span> {student.stateOfOrigin || "—"}</div>
        <div><span className="text-gray-500">Scholarship:</span> {student.scholarship || "—"}</div>
        <div><span className="text-gray-500">CGPA:</span> {student.cgpa ?? "—"}</div>
        <div><span className="text-gray-500">Clubs:</span> {clubs?.join(", ") || "—"}</div>
        <div><span className="text-gray-500">Medical Issues:</span> {medicalIssues?.join(", ") || "—"}</div>
      </div>
    </section>
  );
}
