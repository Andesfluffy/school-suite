"use client";

import { useMemo, useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Link from "next/link";

export default function StudentListClient({ students }: { students: any[] }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [dense, setDense] = useState(false);
  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesQ = q ? s.name.toLowerCase().includes(q.toLowerCase()) : true;
      const matchesStatus = status ? s.status === status : true;
      return matchesQ && matchesStatus;
    });
  }, [students, q, status]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 items-center">
        <Input placeholder="Search name…" value={q} onChange={(e) => setQ(e.target.value)} />
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option>active</option>
          <option>inactive</option>
          <option>suspended</option>
          <option>graduated</option>
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
              <th className="text-left p-2 border">DOB</th>
              <th className="text-left p-2 border">Guardian</th>
              <th className="text-left p-2 border">State of Origin</th>
              <th className="text-left p-2 border">Scholarship</th>
              <th className="text-left p-2 border">CGPA</th>
              <th className="text-left p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="p-2 border text-center" colSpan={8}>No students</td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr key={s.id} className={dense ? "text-[13px]" : undefined}>
                  <td className="p-2 border"><Link href={`/students/${s.id}`}>{s.name}</Link></td>
                  <td className="p-2 border">{s.status}</td>
                  <td className="p-2 border">{s.dob || "—"}</td>
                  <td className="p-2 border">{(s.guardian as any)?.name || "—"}</td>
                  <td className="p-2 border">{s.stateOfOrigin || "—"}</td>
                  <td className="p-2 border">{s.scholarship || "—"}</td>
                  <td className="p-2 border">{s.cgpa ?? "—"}</td>
                  <td className="p-2 border text-blue-600"><Link href={`/students/${s.id}/edit`}>Edit</Link></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

