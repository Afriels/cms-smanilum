import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="container-shell py-10 sm:py-14 lg:py-16">
      <div className="surface-card overflow-hidden bg-gradient-to-r from-blue-700 to-sky-500 p-6 text-white sm:p-8 lg:p-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
              Siap dipakai
            </p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Portal berita sekolah yang rapi, cepat, dan nyaman di semua perangkat
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-50">
              Tampilan publik difokuskan untuk berita, pengumuman, profil, dan galeri
              sekolah dengan pengalaman baca yang konsisten.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/kontak" className="w-full bg-slate-950 hover:bg-slate-900 sm:w-auto">
              Hubungi Sekolah
            </Button>
            <Button href="/berita" variant="secondary" className="w-full sm:w-auto">
              Jelajahi Berita
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
