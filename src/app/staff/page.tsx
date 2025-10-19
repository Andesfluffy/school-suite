import Link from "next/link";
import { listStaff } from "./actions";
import StaffListClient from "@/components/StaffListClient";
import PageHeader from "@/components/PageHeader";

export default async function StaffPage() {
  const staff = await listStaff();
  const total = staff.length;
  const active = staff.filter((member) => member.status === "active").length;
  const academic = staff.filter((member) => member.role === "academic").length;
  const payroll = staff.reduce((sum, member) => sum + (Number(member.salary) || 0), 0);
  const sanctions = staff.filter((member) => Boolean(member.sanction)).length;
  return (
    <section className="space-y-8">
      <PageHeader
        title="Staff"
        subtitle="Track faculty credentials, compensation, and welfare markers across academic and administrative teams."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[{
          label: "Total staff",
          value: total.toLocaleString(),
          detail: "Institution-wide",
        },
        {
          label: "Active",
          value: active.toLocaleString(),
          detail: "On payroll today",
        },
        {
          label: "Academic faculty",
          value: academic.toLocaleString(),
          detail: "Teaching & research",
        },
        {
          label: "Payroll (monthly)",
          value: payroll ? payroll.toLocaleString() : "—",
          detail: "Sum of recorded salaries",
        }].map((card) => (
          <div
            key={card.label}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/5 p-5"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-white/45">{card.label}</p>
            <p className="mt-3 text-2xl font-semibold text-white">{card.value}</p>
            <p className="mt-2 text-sm text-white/60">{card.detail}</p>
          </div>
        ))}
      </div>
      {sanctions ? (
        <div className="rounded-3xl border border-rose-500/25 bg-rose-500/10 p-4 text-sm text-rose-100">
          {sanctions} staff member{sanctions === 1 ? "" : "s"} have open sanctions requiring follow-up.
        </div>
      ) : null}
      <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-[#0b0b0b]/70 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold text-white">Faculty & operations roster</h2>
          <p className="text-sm text-white/70">
            Segment by status, spotlight qualifications, and ensure payroll data aligns before each salary run.
          </p>
        </div>
        <Link
          href="/staff/new"
          className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand-500)]"
        >
          Add staff record
        </Link>
      </div>
      <StaffListClient staff={staff} />
    </section>
  );
}

