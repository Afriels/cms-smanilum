import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Banner } from "@/types";

export function HeroBanner({ banner }: { banner: Banner | null }) {
  return (
    <section className="container-shell pt-6 pb-6 sm:pt-8 sm:pb-8">
      <div className="surface-card relative overflow-hidden px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_70%)] sm:hidden" />
        <div className="absolute inset-y-0 right-0 hidden w-2/5 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.35),transparent_65%)] lg:block" />
        <div className="relative grid gap-6 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <div>
            <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 sm:mb-5 sm:px-4 sm:text-sm">
              <Sparkles className="h-4 w-4" />
              <span className="truncate">Portal sekolah modern, cepat, dan profesional</span>
            </div>
            <h1 className="max-w-3xl break-words text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {banner?.title || "Informasi sekolah hadir lebih rapi, cepat, dan terpercaya."}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:mt-5 sm:text-base sm:leading-8">
              {banner?.subtitle ||
                "Bangun portal berita sekolah dengan berita, pengumuman, galeri, dan CMS internal dalam satu project Next.js fullstack."}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button href={banner?.cta_href || "/berita"} className="w-full gap-2 sm:w-auto">
                {banner?.cta_label || "Jelajahi Berita"}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/profil/tentang" variant="secondary" className="w-full sm:w-auto">
                Profil Sekolah
              </Button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
            {[
              ["Update Cepat", "Berita utama, carousel, dan pengumuman terkelola."],
              ["Konten Terpadu", "Berita, banner, halaman, dan galeri tersusun rapi dalam satu portal."],
              ["SEO Siap", "Open Graph, Twitter Card, sitemap, dan metadata dinamis."],
            ].map(([title, description]) => (
              <div key={title} className="rounded-3xl border border-blue-100 bg-white/85 p-4 sm:p-5">
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
