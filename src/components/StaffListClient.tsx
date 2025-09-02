"use client";

import { useMemo, useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Link from "next/link";

export default function StaffListClient({ staff }: { staff: any[] }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [dense, setDense] = useState(false);
  const filtered = useMemo(() => {
    return staff.filter((m) => {
      const matchesQ = q ? m.name.toLowerCase().includes(q.toLowerCase()) : true;
      const matchesStatus = status ? m.status === status : true;
      const matchesRole = role ? m.role === role : true;
      return matchesQ && matchesStatus && matchesRole;
    });
  }, [staff, q, status, role]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 items-center">
        <Input placeholder="Search name…" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option>active</option>
          <option>inactive</option>
          <option>suspended</option>
          <option>retired</option>
        </Select>
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">All roles</option>
          <option value="academic">academic</option>
          <option value="admin">admin</option>
        </Select>
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" checked={dense} onChange={(e) => setDense(e.target.checked)} />
          Dense
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2 border">Name</th>
              <th className="text-left p-2 border">Status</th>
              <th className="text-left p-2 border">Role</th>
              <th className="text-left p-2 border">Department</th>
              <th className="text-left p-2 border">Rank</th>
              <th className="text-left p-2 border">Salary</th>
              <th className="text-left p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="p-2 border text-center" colSpan={7}>No staff</td>
              </tr>
            ) : (
              filtered.map((m) => (
                <tr key={m.id} className={dense ? "text-[13px]" : undefined}>
                  <td className="p-2 border"><Link href={`/staff/${m.id}`}>{m.name}</Link></td>
                  <td className="p-2 border">{m.status}</td>
                  <td className="p-2 border">{m.role}</td>
                  <td className="p-2 border">{m.department || "—"}</td>
                  <td className="p-2 border">{m.rank || "—"}</td>
                  <td className="p-2 border">{m.salary ?? "—"}</td>
                  <td className="p-2 border text-blue-600"><Link href={`/staff/${m.id}/edit`}>Edit</Link></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

