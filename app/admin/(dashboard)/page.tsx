import { getAdminCollections } from "@/services/content-service";

export default async function AdminPage() {
  const data = await getAdminCollections();

  const stats = [
    ["Posts", data.posts.length],
    ["Categories", data.categories.length],
    ["Carousel", data.carousel.length],
    ["Announcements", data.announcements.length],
    ["Pages", data.pages.length],
    ["Galleries", data.galleries.length],
  ];

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map(([label, value]) => (
          <div key={label} className="surface-card p-6">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">{value}</p>
          </div>
        ))}
      </div>

      <div className="surface-card p-6">
        <h2 className="text-xl font-semibold text-slate-900">Ringkasan sistem</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-900">Fullstack Terpadu</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Frontend publik, API route, login admin, dan dashboard CMS berjalan di project Next.js yang sama.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-900">Siap Supabase</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Database, storage, dan autentikasi admin sudah diberi helper, schema, dan endpoint.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-900">Siap Vercel</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Metadata absolut, fallback env, sitemap, robots, dan struktur App Router sudah disiapkan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
