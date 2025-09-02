"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const items = [
  { title: "Student Profiles", desc: "Complete biodata, guardians, medical notes, and clubs.", icon: "👩‍🎓" },
  { title: "Staff Management", desc: "Roles, departments, salary tracking, and sanctions.", icon: "👨‍🏫" },
  { title: "Performance", desc: "Attendance, tests, exams, and CGPA dashboards.", icon: "📊" },
  { title: "Financials", desc: "Fees, dues, medicals, grants, and expenses.", icon: "💳" },
  { title: "Reports", desc: "CSV export, printable reports, and summaries.", icon: "🧾" },
  { title: "Events", desc: "Academic calendar and announcements.", icon: "📅" },
];

export default function Features() {
  return (
    <section className="mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 70}>
            <motion.div whileHover={{ y: -2 }} className="card p-5 h-full">
              <div className="text-2xl">{it.icon}</div>
              <div className="mt-2 font-medium">{it.title}</div>
              <div className="text-sm text-white/70">{it.desc}</div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}


