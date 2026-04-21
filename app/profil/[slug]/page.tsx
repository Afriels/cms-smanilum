import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { createMetadata } from "@/lib/site";
import { getPageBySlug } from "@/services/content-service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  return createMetadata({
    title: page?.meta_title || page?.title || "Profil Sekolah",
    description: page?.meta_description || page?.excerpt || "Halaman profil sekolah.",
    path: `/profil/${slug}`,
  });
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  return (
    <div className="container-shell py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { label: "Beranda", href: "/" },
          { label: "Profil", href: "/profil/tentang" },
          { label: page.title },
        ]}
      />
      <article className="surface-card p-5 sm:p-8 lg:p-10">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{page.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{page.excerpt}</p>
        <div className="article-content mt-8 whitespace-pre-line">
          {page.content}
        </div>
      </article>
    </div>
  );
}
