import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="container-shell py-16">
      <div className="surface-card overflow-hidden bg-gradient-to-r from-blue-700 to-sky-500 p-8 text-white sm:p-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
              Siap dipakai
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Satu project penuh untuk portal berita sekolah dan CMS internal
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-50">
              Arsitektur fullstack Next.js ini dirancang agar cepat di Vercel, mudah
              dihubungkan ke Supabase, dan nyaman dipakai admin sekolah.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/admin/login" variant="secondary">
              Masuk Admin
            </Button>
            <Button href="/kontak" className="bg-slate-950 hover:bg-slate-900">
              Hubungi Sekolah
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
