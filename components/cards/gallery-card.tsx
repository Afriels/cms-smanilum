import Link from "next/link";
import type { Gallery } from "@/types";

export function GalleryCard({ gallery }: { gallery: Gallery }) {
  return (
    <Link href={`/galeri/${gallery.slug}`} className="surface-card group overflow-hidden">
      <div
        className="aspect-[4/3] w-full bg-cover bg-center transition duration-300 group-hover:scale-[1.02]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.04), rgba(15,23,42,0.28)), url(${gallery.cover_image_url || "/images/og-default.svg"})`,
        }}
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900">{gallery.title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">{gallery.description}</p>
      </div>
    </Link>
  );
}
