import { getStaff, updateStaff } from "../../actions";
import StaffForm from "@/components/StaffForm";

export default async function EditStaff({ params }: { params: { id: string } }) {
  const staff = await getStaff(params.id);
  if (!staff) return <div className="text-sm">Staff not found.</div>;

  return (
    <section className="space-y-6 max-w-3xl">
      <h1 className="text-xl font-semibold">Edit Staff</h1>
      <StaffForm action={updateStaff.bind(null, staff.id)} initial={staff as any} redirectTo={`/staff/${staff.id}`} submitLabel="Update" />
    </section>
  );
}
