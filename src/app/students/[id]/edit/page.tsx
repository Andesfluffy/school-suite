import { getStudent, updateStudent } from "../../actions";
import StudentForm from "@/components/StudentForm";
import type { Student } from "@/lib/mock-data";

export default async function EditStudent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const student = await getStudent(id);
  if (!student) return <div className="text-sm">Student not found.</div>;

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

  const initial: Partial<Student> = {
    id: student.id,
    name: student.name,
    status: student.status,
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
    sanction: student.sanction ?? undefined,
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

  return (
    <section className="space-y-6 max-w-3xl">
      <h1 className="text-xl font-semibold">Edit Student</h1>
      <StudentForm
        action={updateStudent.bind(null, student.id)}
        initial={initial}
        redirectTo={`/students/${id}`}
        submitLabel="Update"
      />
    </section>
  );
}
