import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/70 bg-slate-950 text-slate-200">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold text-white">Smanilum News Portal</h2>
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
            Admin
          </h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <Link href="/admin/login">Login CMS</Link>
            <p>Deploy-ready untuk Vercel + Supabase</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
