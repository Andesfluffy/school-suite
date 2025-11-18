import { getStaff, updateStaff } from "../../actions";
import StaffForm from "@/components/StaffForm";
import type { Staff } from "@/lib/mock-data";

export default async function EditStaff({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const staff = await getStaff(id);
  if (!staff) return <div className="text-sm">Staff not found.</div>;

  const initial: Partial<Staff> = {
    id: staff.id,
    name: staff.name,
    status: staff.status,
    role: staff.role,
    dob: staff.dob ?? undefined,
    phone: staff.phone ?? undefined,
    photoUrl: staff.photoUrl ?? undefined,
    stateOfOrigin: staff.stateOfOrigin ?? undefined,
    disabilities: (staff.disabilities as string[] | null) ?? undefined,
    rank: staff.rank ?? undefined,
    salary: staff.salary ?? undefined,
    subjects: (staff.subjects as string[] | null) ?? undefined,
    department: staff.department ?? undefined,
    sanction: staff.sanction ?? undefined,
    clubs: (staff.clubs as string[] | null) ?? undefined,
    qualification: staff.qualification ?? undefined,
  };

  return (
    <section className="space-y-6 max-w-3xl">
      <h1 className="text-xl font-semibold">Edit Staff</h1>
      <StaffForm
        action={updateStaff.bind(null, staff.id)}
        initial={initial}
        redirectTo={`/staff/${id}`}
        submitLabel="Update"
      />
    </section>
  );
}
