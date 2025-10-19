import { getStudent, updateStudent } from "../../actions";
import StudentForm from "@/components/StudentForm";

export default async function EditStudent({ params }: { params: { id: string } }) {
  const student = await getStudent(params.id);
  if (!student) return <div className="text-sm">Student not found.</div>;

  return (
    <section className="space-y-6 max-w-3xl">
      <h1 className="text-xl font-semibold">Edit Student</h1>
      <StudentForm
        action={updateStudent.bind(null, student.id)}
        initial={student}
        redirectTo={`/students/${student.id}`}
        submitLabel="Update"
      />
    </section>
  );
}
