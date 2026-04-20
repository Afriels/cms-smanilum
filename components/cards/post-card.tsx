import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types";

export function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  return (
    <article className="surface-card group overflow-hidden">
      <div className={compact ? "p-5" : ""}>
        <div
          className="aspect-[16/10] w-full bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.05), rgba(15,23,42,0.35)), url(${post.thumbnail_url || "/images/og-default.svg"})`,
          }}
        />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <Badge>{post.category?.name || "Berita"}</Badge>
          <span className="text-xs text-slate-400">{formatDate(post.published_at)}</span>
        </div>
        <div>
          <Link href={`/berita/${post.slug}`} className="text-xl font-semibold text-slate-900">
            {post.title}
          </Link>
          <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
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
