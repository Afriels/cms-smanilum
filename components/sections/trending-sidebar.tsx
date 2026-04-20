import Link from "next/link";
import { Flame } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/types";

export function TrendingSidebar({ posts }: { posts: Post[] }) {
  return (
    <aside className="surface-card p-6">
      <div className="mb-5 flex items-center gap-2 text-blue-700">
        <Flame className="h-5 w-5" />
        <h3 className="text-lg font-semibold text-slate-900">Trending Posts</h3>
      </div>
      <div className="space-y-5">
        {posts.map((post, index) => (
          <div key={post.id} className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
              #{index + 1}
            </p>
            <Link href={`/berita/${post.slug}`} className="mt-2 block text-sm font-semibold text-slate-900">
              {post.title}
            </Link>
            <p className="mt-2 text-xs text-slate-500">{formatDate(post.published_at)}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
