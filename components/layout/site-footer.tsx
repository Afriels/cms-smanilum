import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/70 bg-slate-950 text-slate-200">
      <div className="container-shell grid gap-8 py-12 sm:py-14 md:grid-cols-2 xl:grid-cols-[1.3fr_0.7fr_0.8fr]">
        <div>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">Smanilum News Portal</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
            Portal berita sekolah modern untuk publikasi kegiatan, prestasi, pengumuman,
            dan profil institusi dalam satu platform terpadu.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Navigasi
          </h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <Link href="/berita">Berita</Link>
            <Link href="/galeri">Galeri</Link>
            <Link href="/profil/tentang">Profil</Link>
            <Link href="/kontak">Kontak</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Kontak
          </h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <p>Jl. Pendidikan No. 1</p>
            <p>info@smanilum.sch.id</p>
            <p>Deploy-ready untuk Vercel + Supabase</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-3 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Smanilum News Portal. Semua hak dilindungi.</p>
          <Link href="/admin/login" className="text-slate-400 hover:text-white">
            Login CMS
          </Link>
        </div>
      </div>
    </footer>
  );
}
