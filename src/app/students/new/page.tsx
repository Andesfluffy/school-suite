import { createStudent } from "../actions";
import StudentForm from "@/components/StudentForm";

export default function NewStudentPage() {
  return (
    <section className="space-y-6 max-w-3xl">
      <h1 className="text-xl font-semibold">Add Student</h1>
      <StudentForm action={createStudent} redirectTo="/students" />
    </section>
  );
}
