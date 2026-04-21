import { notFound } from "next/navigation";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { createMetadata } from "@/lib/site";
import { getGalleryBySlug } from "@/services/content-service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getGalleryBySlug(slug);

  return createMetadata({
    title: data.gallery?.title || "Album galeri",
    description:
      data.gallery?.description || "Dokumentasi foto kegiatan sekolah.",
    path: `/galeri/${slug}`,
    image: data.gallery?.cover_image_url,
  });
}

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { gallery, items } = await getGalleryBySlug(slug);

  if (!gallery) notFound();

  return (
    <div className="container-shell py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { label: "Beranda", href: "/" },
          { label: "Galeri", href: "/galeri" },
          { label: gallery.title },
        ]}
      />
      <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{gallery.title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{gallery.description}</p>
      <div className="mt-8 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="surface-card overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src={item.image_url}
                alt={item.title || gallery.title}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-4 text-sm text-slate-700 sm:p-5">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
