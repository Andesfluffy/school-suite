import { createStaff } from "../actions";
import StaffForm from "@/components/StaffForm";

export default function NewStaffPage() {
  return (
    <section className="space-y-6 max-w-3xl">
      <h1 className="text-xl font-semibold">Add Staff</h1>
      <StaffForm action={createStaff} redirectTo="/staff" />
    </section>
  );
}
