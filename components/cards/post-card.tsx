import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types";

export function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  return (
    <article className="surface-card group overflow-hidden">
      <div className={compact ? "p-4 sm:p-5" : ""}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem]">
          <Image
            src={post.thumbnail_url || "/images/og-default.svg"}
            alt={post.title}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-950/10 to-transparent" />
        </div>
      </div>
      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <Badge>{post.category?.name || "Berita"}</Badge>
          <span className="text-xs text-slate-400">{formatDate(post.published_at)}</span>
        </div>
        <div>
          <Link
            href={`/berita/${post.slug}`}
            className="line-clamp-2 text-lg font-semibold text-slate-900 sm:text-xl"
          >
            {post.title}
          </Link>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
            {post.excerpt}
          </p>
        </div>
        <Link
          href={`/berita/${post.slug}`}
          className="inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800"
        >
          Baca selengkapnya
        </Link>
      </div>
    </article>
  );
}
