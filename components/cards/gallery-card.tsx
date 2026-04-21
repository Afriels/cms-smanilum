import Image from "next/image";
import Link from "next/link";
import type { Gallery } from "@/types";

export function GalleryCard({ gallery }: { gallery: Gallery }) {
  return (
    <Link href={`/galeri/${gallery.slug}`} className="surface-card group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={gallery.cover_image_url || "/images/og-default.svg"}
          alt={gallery.title}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="line-clamp-2 text-lg font-semibold text-slate-900">{gallery.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-7 text-slate-600">
          {gallery.description}
        </p>
      </div>
    </Link>
  );
}
