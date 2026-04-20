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
    <div className="container-shell py-10">
      <Breadcrumbs
        items={[
          { label: "Beranda", href: "/" },
          { label: "Profil", href: "/profil/tentang" },
          { label: page.title },
        ]}
      />
      <article className="surface-card p-8 sm:p-10">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">{page.title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{page.excerpt}</p>
        <div className="prose prose-slate mt-8 max-w-none whitespace-pre-line text-slate-700">
          {page.content}
        </div>
      </article>
    </div>
  );
}
