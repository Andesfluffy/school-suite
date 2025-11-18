import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { listLibraryAssets } from "./actions";

const resourceTypeLabels: Record<string, string> = {
  lecture_note: "Lecture note",
  scheme_of_work: "Scheme of work",
  reading: "Reading",
  past_question: "Past question",
  media: "Media",
};

type LibraryAssetRecord = Awaited<ReturnType<typeof listLibraryAssets>> extends (infer T)[] ? T : never;

export default async function LibraryPage() {
  const assets = await listLibraryAssets();
  const totalDownloads = assets.reduce((sum, asset) => sum + Number(asset.downloads || 0), 0);
  const subjects = Array.from(new Set(assets.map((asset) => asset.subject))).sort();
  const recent = assets.slice(0, 5);
  const mediaCount = assets.filter((asset) => asset.format === "video" || asset.format === "audio").length;

  return (
    <section className="space-y-8">
      <PageHeader
        title="E-Library"
        subtitle="Curate lecture notes, schemes of work, media assets, and past questions for anytime access."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[{
          label: "Resources available",
          value: assets.length.toLocaleString(),
          detail: `${subjects.length} subjects covered`,
        },
        {
          label: "Total downloads",
          value: totalDownloads.toLocaleString(),
          detail: "Across the last 12 months",
        },
        {
          label: "Media assets",
          value: mediaCount.toLocaleString(),
          detail: "Audio & video files",
        },
        {
          label: "Recent uploads",
          value: recent.length ? `${recent.length} this week` : "—",
          detail: recent[0]?.title ?? "Awaiting uploads",
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
          <h2 className="font-display text-lg font-semibold text-white">Digital resource shelves</h2>
          <p className="text-sm text-white/70">
            Upload lesson materials, revision packs, and multimedia assets once and serve them securely to every learner cohort.
          </p>
        </div>
        <Link
          href="/library/new"
          className="inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand-500)]"
        >
          Upload material
        </Link>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-white">Resource catalogue</h3>
          <span className="text-xs uppercase tracking-[0.28em] text-white/45">Updated on upload</span>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.28em] text-white/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-left font-medium">Subject</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Format</th>
                <th className="px-4 py-3 text-left font-medium">Downloads</th>
                <th className="px-4 py-3 text-left font-medium">Uploaded by</th>
                <th className="px-4 py-3 text-left font-medium">Published</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/80">
              {assets.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-white/60" colSpan={7}>
                    No library assets yet. Upload notes, schemes, or past questions to get started.
                  </td>
                </tr>
              ) : (
                assets.map((asset: LibraryAssetRecord) => (
                  <tr key={asset.id} className="hover:bg-white/5">
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{asset.title}</div>
                      {Array.isArray(asset.tags) && asset.tags.length ? (
                        <div className="mt-1 flex flex-wrap gap-1 text-xs text-white/50">
                          {asset.tags.map((tag) => {
                            const label = String(tag);
                            return (
                              <span key={`${asset.id}-${label}`} className="rounded-full border border-white/10 px-2 py-0.5">
                                {label}
                              </span>
                            );
                          })}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      <div>{asset.subject}</div>
                      {asset.level ? (
                        <div className="text-xs text-white/60">{asset.level}</div>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 capitalize">{resourceTypeLabels[asset.resourceType] || "—"}</td>
                    <td className="px-4 py-3 capitalize">{String(asset.format || "—").replace(/_/g, " ")}</td>
                    <td className="px-4 py-3">{Number(asset.downloads || 0).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {asset.uploader?.name ? (
                        <>
                          <div>{asset.uploader?.name}</div>
                          <div className="text-xs text-white/60">{asset.uploader?.department || "Academic"}</div>
                        </>
                      ) : (
                        <span className="text-white/60">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {asset.publishedAt ? new Date(asset.publishedAt).toLocaleDateString() : "—"}
                    </td>
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
