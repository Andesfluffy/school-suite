import Link from "next/link";
import type { JSX } from "react";
import Reveal from "@/components/Reveal";
import {
  EventsIcon,
  FinancialsIcon,
  LibraryIcon,
  PayrollIcon,
  PerformanceIcon,
  QuestionBankIcon,
  StaffIcon,
  StudentsIcon,
} from "@/components/icons";

type LinkConfig = {
  href: string;
  title: string;
  desc: string;
  icon: (props: { className?: string }) => JSX.Element;
  accent: string;
};

const links: LinkConfig[] = [
  {
    href: "/students",
    title: "Students",
    desc: "Admissions, welfare, guardians, and fees in one cockpit",
    icon: (props) => <StudentsIcon className={props.className} />,
    accent: "from-[#2c1e25] via-[#3a2831] to-[#130a0e]",
  },
  {
    href: "/staff",
    title: "Staff",
    desc: "Contracts, career paths, reviews, and payroll cadences",
    icon: (props) => <StaffIcon className={props.className} />,
    accent: "from-[#1a2820] via-[#243327] to-[#0c120e]",
  },
  {
    href: "/performance",
    title: "Performance",
    desc: "Assessments, attendance, clubs, and interventions",
    icon: (props) => <PerformanceIcon className={props.className} />,
    accent: "from-[#1a2533] via-[#233445] to-[#0c1118]",
  },
  {
    href: "/library",
    title: "E-Library",
    desc: "Lecture notes, schemes of work, media, and past questions",
    icon: (props) => <LibraryIcon className={props.className} />,
    accent: "from-[#2b1f2a] via-[#3a2c37] to-[#150e16]",
  },
  {
    href: "/question-bank",
    title: "Question bank",
    desc: "Stage mid-terms, exams, and CA scripts before release",
    icon: (props) => <QuestionBankIcon className={props.className} />,
    accent: "from-[#1a2f3c] via-[#2a4458] to-[#0d1620]",
  },
  {
    href: "/events",
    title: "Events",
    desc: "Ceremonies, fixtures, notices, and community moments",
    icon: (props) => <EventsIcon className={props.className} />,
    accent: "from-[#20253b] via-[#2f3350] to-[#0f121e]",
  },
  {
    href: "/financials",
    title: "Financials",
    desc: "Revenue, expenses, cashflow, and audit-ready ledgers",
    icon: (props) => <FinancialsIcon className={props.className} />,
    accent: "from-[#162b23] via-[#1f3a2f] to-[#0a1410]",
  },
  {
    href: "/payroll",
    title: "Payroll",
    desc: "Generate payslips, track allowances, and confirm payout status",
    icon: (props) => <PayrollIcon className={props.className} />,
    accent: "from-[#142922] via-[#1f3b32] to-[#0a1411]",
  },
];

export default function QuickLinks() {
  return (
    <section className="relative z-10 mt-10">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {links.map((c, i) => (
          <Reveal key={c.href} delay={i * 50}>
            <Link
              href={c.href}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0f1416] p-5 transition-all hover:-translate-y-0.5 hover:border-[var(--brand)]/60 hover:shadow-[0_24px_70px_-30px_rgba(var(--brand-rgb),0.55)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
              aria-label={`${c.title}: ${c.desc}`}
            >
              <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} opacity-70`} />
              </div>
              <div className="relative flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 backdrop-blur">
                  {c.icon({ className: "h-10 w-10" })}
                </div>
                <div className="space-y-2">
                  <div className="font-display text-lg font-semibold text-white transition-colors group-hover:text-[var(--brand-500)]">
                    {c.title}
                  </div>
                  <div className="text-sm text-white/70 leading-relaxed">{c.desc}</div>
                </div>
              </div>
              <div className="relative mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/40">
                <span className="h-[1px] w-6 bg-white/20" aria-hidden />
                Enter workspace
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
