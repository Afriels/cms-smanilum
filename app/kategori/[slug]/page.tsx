import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PostCard } from "@/components/cards/post-card";
import { createMetadata } from "@/lib/site";
import { getCategoryBySlug, getPosts } from "@/services/content-service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  return createMetadata({
    title: category ? `Kategori ${category.name}` : "Kategori",
    description:
      category?.description || "Kumpulan berita sekolah berdasarkan kategori.",
    path: `/kategori/${slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const result = await getPosts({ categorySlug: slug });

  return (
    <div className="container-shell py-10">
      <Breadcrumbs
        items={[
          { label: "Beranda", href: "/" },
          { label: "Kategori", href: "/berita" },
          { label: category.name },
        ]}
      />
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
        {category.name}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
        {category.description}
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {result.data.map((post) => (
          <PostCard key={post.id} post={post} compact />
        ))}
      </div>
    </div>
  );
}
