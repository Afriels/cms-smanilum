import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
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
    <div className="container-shell py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Pencarian" }]} />
      <form className="surface-card flex flex-col gap-4 p-5 sm:flex-row sm:p-6">
        <Input
          defaultValue={query}
          name="q"
          placeholder="Cari berita, kategori, atau topik..."
          className="flex-1"
        />
        <Button type="submit" className="w-full sm:w-auto">
          Cari
        </Button>
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
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {result.posts.map((post) => (
              <PostCard key={post.id} post={post} compact />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
