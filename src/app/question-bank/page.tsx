import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { listQuestionBankItems } from "./actions";

const examTypeLabels: Record<string, string> = {
  exam: "Exam",
  midterm: "Mid-term",
  mid_term: "Mid-term",
  ca: "Continuous assessment",
  practice: "Practice",
};

type QuestionBankRecord = Awaited<ReturnType<typeof listQuestionBankItems>> extends (infer T)[] ? T : never;

function formatDate(value?: string | null) {
  if (!value) return "—";
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) return value;
  return new Date(parsed).toLocaleDateString();
}

export default async function QuestionBankPage() {
  const items = await listQuestionBankItems();
  const upcoming = items.filter((item) => {
    if (!item.scheduledDate) return false;
    const parsed = Date.parse(item.scheduledDate as string);
    return Number.isFinite(parsed) && parsed >= Date.now();
  });
  const averageMarks = items.length
    ? items.reduce((sum, item) => sum + Number(item.totalMarks || 0), 0) / items.length
    : 0;
  const durations = items.filter((item) => item.durationMinutes != null);
  const averageDuration = durations.length
    ? durations.reduce((sum, item) => sum + Number(item.durationMinutes || 0), 0) / durations.length
    : 0;
  const subjects = Array.from(new Set(items.map((item) => item.subject))).sort();

  return (
    <section className="space-y-8">
      <PageHeader
        title="Question bank"
        subtitle="Stage assessments ahead of time and keep every teacher aligned on blueprint, marking guide, and release dates."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[{
          label: "Question sets",
          value: items.length.toLocaleString(),
          detail: `${subjects.length} subjects represented`,
        },
        {
          label: "Upcoming assessments",
          value: upcoming.length ? upcoming.length.toString() : "—",
          detail: upcoming[0]?.title ?? "Nothing scheduled",
        },
        {
          label: "Average total marks",
          value: averageMarks ? averageMarks.toFixed(0) : "—",
          detail: "Across all question sets",
        },
        {
          label: "Typical duration",
          value: averageDuration ? `${averageDuration.toFixed(0)} mins` : "—",
          detail: durations.length ? "Recorded durations" : "Awaiting data",
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

      <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-[#0b0b0b]/70 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold text-white">Assessment staging area</h2>
          <p className="text-sm text-white/70">
            Centralise marking schemes, exportable scripts, and exam windows so invigilators and academic leads stay coordinated.
          </p>
        </div>
        <Link
          href="/question-bank/new"
          className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand-500)]"
        >
          Add question set
        </Link>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-white">Question bank catalogue</h3>
          <span className="text-xs uppercase tracking-[0.28em] text-white/45">Ready before exam week</span>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.28em] text-white/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-left font-medium">Subject</th>
                <th className="px-4 py-3 text-left font-medium">Term</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Marks</th>
                <th className="px-4 py-3 text-left font-medium">Duration</th>
                <th className="px-4 py-3 text-left font-medium">Scheduled</th>
                <th className="px-4 py-3 text-left font-medium">Uploaded by</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/80">
              {items.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-white/60" colSpan={8}>
                    No assessments staged yet. Add your exam or continuous assessment pack ahead of release.
                  </td>
                </tr>
              ) : (
                items.map((item: QuestionBankRecord) => (
                  <tr key={item.id} className="hover:bg-white/5">
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{item.title}</div>
                      {item.fileUrl ? (
                        <a
                          href={item.fileUrl}
                          className="mt-1 inline-flex items-center gap-1 text-xs text-[var(--brand-200)] hover:text-[var(--brand)]"
                        >
                          Open resource ↗
                        </a>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">{item.subject}</td>
                    <td className="px-4 py-3">{item.term || "—"}</td>
                    <td className="px-4 py-3">{examTypeLabels[item.examType ?? ""] || item.examType || "—"}</td>
                    <td className="px-4 py-3">{item.totalMarks != null ? item.totalMarks : "—"}</td>
                    <td className="px-4 py-3">{item.durationMinutes != null ? `${item.durationMinutes} mins` : "—"}</td>
                    <td className="px-4 py-3">{formatDate(item.scheduledDate ?? undefined)}</td>
                    <td className="px-4 py-3">{item.uploader?.name ?? "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
