import { PostCard } from "@/components/cards/post-card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/site";
import { getPosts } from "@/services/content-service";

export const metadata = createMetadata({
  title: "Berita Sekolah",
  description: "Daftar berita terbaru, unggulan, dan artikel sekolah dengan SEO-ready metadata.",
  path: "/berita",
});

export default async function BeritaPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page || 1);
  const result = await getPosts({ page });

  return (
    <div className="container-shell py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Berita" }]} />
      <SectionHeading
        eyebrow="Newsroom"
        title="Berita sekolah"
        description="Halaman listing berita dengan pagination dan card-based layout."
      />
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {result.data.map((post) => (
          <PostCard key={post.id} post={post} compact />
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {page > 1 ? (
          <Button href={`/berita?page=${page - 1}`} variant="secondary" className="w-full sm:w-auto">
            Halaman sebelumnya
          </Button>
        ) : null}
        {page < result.totalPages ? (
          <Button href={`/berita?page=${page + 1}`} className="w-full sm:w-auto">
            Halaman berikutnya
          </Button>
        ) : null}
      </div>
    </div>
  );
}
