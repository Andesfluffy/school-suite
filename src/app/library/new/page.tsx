import { prisma } from "@/lib/db";
import LibraryAssetForm from "@/components/LibraryAssetForm";
import { createLibraryAsset } from "../actions";

export default async function NewLibraryAssetPage() {
  const staff = await prisma.staff.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } });
  return (
    <section className="space-y-6 max-w-2xl">
      <h1 className="text-xl font-semibold text-white">Upload study material</h1>
      <p className="text-sm text-white/70">
        Share schemes of work, lecture notes, multimedia resources, and curated readings with your learners.
      </p>
      <LibraryAssetForm action={createLibraryAsset} staff={staff} redirectTo="/library" />
    </section>
  );
}
