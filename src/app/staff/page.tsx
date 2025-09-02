import Link from "next/link";
import { listStaff } from "./actions";
import StaffListClient from "@/components/StaffListClient";
import PageHeader from "@/components/PageHeader";

export default async function StaffPage() {
  const staff = await listStaff();
  return (
    <section className="space-y-6">
      <PageHeader title="Staff" subtitle="Manage staff biodata, roles, ranks, and salaries." />
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Staff</h1>
        <Link
          href="/staff/new"
          className="rounded bg-black text-white px-3 py-1 text-sm"
        >
          Add Staff
        </Link>
      </header>
      <p className="text-sm text-white/70">
        Record and manage staff biodata, ranks, roles, and salaries.
      </p>
      <StaffListClient staff={staff as any} />
    </section>
  );
}

