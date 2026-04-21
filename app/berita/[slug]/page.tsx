import { notFound } from "next/navigation";
import { Link2, Share2 } from "lucide-react";
import Image from "next/image";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PostCard } from "@/components/cards/post-card";
import { Badge } from "@/components/ui/badge";
import { createMetadata } from "@/lib/site";
import { absoluteUrl, formatDate } from "@/lib/utils";
import { getPostBySlug, getRelatedPosts } from "@/services/content-service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return createMetadata({
      title: "Berita tidak ditemukan",
      description: "Konten berita yang Anda cari tidak tersedia.",
      path: `/berita/${slug}`,
    });
  }

  return createMetadata({
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    path: `/berita/${post.slug}`,
    image: post.og_image_url || post.thumbnail_url,
    type: "article",
  });
}

export default async function DetailBeritaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const related = await getRelatedPosts(post);
  const shareUrl = absoluteUrl(`/berita/${post.slug}`);

  return (
    <div className="container-shell py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
          { label: post.title },
        ]}
      />
      <article className="surface-card overflow-hidden">
        <div className="relative aspect-[16/10] sm:aspect-[16/8] lg:aspect-[16/7]">
          <Image
            src={post.thumbnail_url || "/images/og-default.svg"}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 92vw, 1280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/15 to-transparent" />
        </div>
        <div className="p-5 sm:p-8 lg:p-10">
          <Badge>{post.category?.name || "Berita"}</Badge>
          <h1 className="mt-4 max-w-4xl break-words text-3xl font-semibold tracking-tight text-slate-950 sm:mt-5 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            {post.excerpt}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>{formatDate(post.published_at)}</span>
            <span>{post.author_name || "Admin"}</span>
          </div>
          <div className="article-content mt-8 whitespace-pre-line">
            {post.content}
          </div>
          <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:flex-wrap sm:items-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Share2 className="h-4 w-4" />
              Bagikan:
            </span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-sm"
            >
              Facebook
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${shareUrl}`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-sm"
            >
              WhatsApp
            </a>
            <a
              href={shareUrl}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-sm"
            >
              <Link2 className="mr-2 inline h-4 w-4" />
              Copy Link
            </a>
          </div>
        </div>
      </article>

      <section className="py-8 sm:py-10">
        <h2 className="text-2xl font-semibold text-slate-950">Related posts</h2>
        <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <PostCard key={item.id} post={item} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
