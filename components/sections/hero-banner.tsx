import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Banner } from "@/types";

export function HeroBanner({ banner }: { banner: Banner | null }) {
  return (
    <section className="container-shell pt-10 pb-8">
      <div className="surface-card relative overflow-hidden p-8 sm:p-12">
        <div className="absolute inset-y-0 right-0 hidden w-2/5 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.35),transparent_65%)] lg:block" />
        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <Sparkles className="h-4 w-4" />
              Portal sekolah modern, cepat, dan profesional
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {banner?.title || "Informasi sekolah hadir lebih rapi, cepat, dan terpercaya."}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              {banner?.subtitle ||
                "Bangun portal berita sekolah dengan berita, pengumuman, galeri, dan CMS internal dalam satu project Next.js fullstack."}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={banner?.cta_href || "/berita"} className="gap-2">
                {banner?.cta_label || "Jelajahi Berita"}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/profil/tentang" variant="secondary">
                Profil Sekolah
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ["Update Cepat", "Berita utama, carousel, dan pengumuman terkelola."],
              ["CMS Terpadu", "Kelola post, banner, halaman, dan galeri dari /admin."],
              ["SEO Siap", "Open Graph, Twitter Card, sitemap, dan metadata dinamis."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-3xl border border-blue-100 bg-white/85 p-5">
                <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
