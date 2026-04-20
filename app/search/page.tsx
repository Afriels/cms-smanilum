import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { EmptyState } from "@/components/ui/empty-state";
import { PostCard } from "@/components/cards/post-card";
import { searchContent } from "@/services/content-service";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const result = query ? await searchContent(query) : { posts: [], categories: [] };

  return (
    <div className="container-shell py-10">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Pencarian" }]} />
      <form className="surface-card flex flex-col gap-4 p-6 sm:flex-row">
        <input
          defaultValue={query}
          name="q"
          placeholder="Cari berita, kategori, atau topik..."
          className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
        />
        <button className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white">
          Cari
        </button>
      </form>

      <div className="mt-8">
        {!query ? (
          <EmptyState
            title="Mulai pencarian"
            description="Masukkan kata kunci untuk menemukan berita dan kategori."
          />
        ) : result.posts.length === 0 ? (
          <EmptyState
            title="Hasil belum ditemukan"
            description={`Belum ada hasil untuk "${query}". Coba kata kunci lain.`}
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {result.posts.map((post) => (
              <PostCard key={post.id} post={post} compact />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
