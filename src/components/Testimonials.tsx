import Reveal from "@/components/Reveal";

const quotes = [
  {
    body: "Setup was quick and the UI feels premium. Our staff onboarded in days, not weeks.",
    author: "Academic Director",
  },
  {
    body: "Financial tracking became painless. Exports and printable reports save hours each month.",
    author: "Bursar",
  },
  {
    body: "Attendance and CGPA dashboards give us instant clarity across terms.",
    author: "Head of Department",
  },
];

export default function Testimonials() {
  return (
    <section className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quotes.map((q, i) => (
          <Reveal key={i} delay={i * 70}>
            <figure className="card p-5 h-full">
              <blockquote className="text-sm text-gray-800">“{q.body}”</blockquote>
              <figcaption className="mt-3 text-xs text-white/70">— {q.author}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}


