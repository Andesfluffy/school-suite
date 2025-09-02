import Link from "next/link";
import { getStaff, deleteStaff } from "../actions";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";

export default async function StaffDetail({ params }: { params: { id: string } }) {
  const staff = await getStaff(params.id);
  if (!staff) return <div className="text-sm">Staff not found.</div>;

  return (
    <section className="space-y-4">
      <div className="card p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={staff.name} src={staff.photoUrl as string | undefined} size={72} />
          <div>
            <div className="text-xl font-semibold">{staff.name}</div>
            <div className="mt-1 flex gap-2">
              <Badge color={staff.status === "active" ? "green" : staff.status === "suspended" ? "red" : "gray"}>{staff.status}</Badge>
              <Badge color="blue">{staff.role}</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2 text-sm">
          <Link href={`/staff/${staff.id}/edit`}><Button variant="secondary">Edit</Button></Link>
          <form action={deleteStaff.bind(null, staff.id)}>
            <Button variant="danger">Delete</Button>
          </form>
        </div>
      </div>
      <Tabs items={[
        { href: `/staff/${staff.id}`, label: "Overview" },
        { href: `/staff/${staff.id}/financials`, label: "Financials" },
        { href: `/staff/${staff.id}/schedule`, label: "Schedule" },
        { href: `/staff/${staff.id}/notes`, label: "Notes" },
      ]} />
      <div className="card p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
        <div><span className="text-gray-500">Status:</span> {staff.status}</div>
        <div><span className="text-gray-500">Role:</span> {staff.role}</div>
        <div><span className="text-gray-500">DOB:</span> {staff.dob || "—"}</div>
        <div><span className="text-gray-500">Phone:</span> {staff.phone || "—"}</div>
        <div><span className="text-gray-500">Department:</span> {staff.department || "—"}</div>
        <div><span className="text-gray-500">Rank:</span> {staff.rank || "—"}</div>
        <div><span className="text-gray-500">Salary:</span> {staff.salary ?? "—"}</div>
        <div><span className="text-gray-500">Clubs:</span> {(staff.clubs as string[] | null)?.join(", ") || "—"}</div>
      </div>
    </section>
  );
}
