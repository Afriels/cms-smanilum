import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { GalleryCard } from "@/components/cards/gallery-card";
import { createMetadata } from "@/lib/site";
import { getGalleries } from "@/services/content-service";

export const metadata = createMetadata({
  title: "Galeri Sekolah",
  description: "Album dokumentasi kegiatan sekolah dengan tampilan grid foto modern.",
  path: "/galeri",
});

export default async function GalleryPage() {
  const galleries = await getGalleries();

  return (
    <div className="container-shell py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Galeri" }]} />
      <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Galeri</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
        Album foto kegiatan, prestasi, dan momen penting sekolah.
      </p>
      <div className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {galleries.map((gallery) => (
          <GalleryCard key={gallery.id} gallery={gallery} />
        ))}
      </div>
    </div>
  );
}
