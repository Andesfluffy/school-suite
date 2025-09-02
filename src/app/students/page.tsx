import Link from "next/link";
import { listStudents } from "./actions";
import StudentListClient from "@/components/StudentListClient";
import PageHeader from "@/components/PageHeader";

export default async function StudentsPage() {
  const students = await listStudents();
  return (
    <section className="space-y-6">
      <PageHeader title="Students" subtitle="Record and manage student biodata, academics, and finances." />
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Students</h1>
        <Link
          href="/students/new"
          className="rounded bg-black text-white px-3 py-1 text-sm"
        >
          Add Student
        </Link>
      </header>
      <StudentListClient students={students as any} />
    </section>
  );
}
