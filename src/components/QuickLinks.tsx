import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";

const links = [
  { href: "/students", title: "Students", desc: "Biodata, academics, finances", icon: "/icons/student.svg" },
  { href: "/staff", title: "Staff", desc: "Biodata, roles, salaries", icon: "/icons/staff.svg" },
  { href: "/performance", title: "Performance", desc: "Attendance, tests, exams, CGPA", icon: "/icons/performance.svg" },
  { href: "/events", title: "Events", desc: "Calendar and notices", icon: "/icons/events.svg" },
  { href: "/financials", title: "Financials", desc: "Income and expenses", icon: "/icons/financials.svg" },
];

export default function QuickLinks() {
  return (
    <section className="relative z-10 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {links.map((c, i) => (
          <Reveal key={c.href} delay={i * 50}>
            <Link
              href={c.href}
              className="card p-5 group focus:outline-none focus:ring-2 focus:ring-[var(--brand)] hover:elev-1 transition-shadow"
              aria-label={`${c.title}: ${c.desc}`}
            >
              <div className="flex items-start gap-3">
                <Image src={c.icon} alt="" width={24} height={24} className="mt-0.5" aria-hidden />
                <div>
                  <div className="font-medium text-white group-hover:text-[var(--brand)] transition-colors">{c.title}</div>
                  <div className="text-sm text-white/70">{c.desc}</div>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
