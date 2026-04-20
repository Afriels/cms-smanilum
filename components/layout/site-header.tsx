import Link from "next/link";
import { Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/berita", label: "Berita" },
  { href: "/galeri", label: "Galeri" },
  { href: "/profil/tentang", label: "Profil" },
  { href: "/kontak", label: "Kontak" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur-xl">
      <div className="container-shell flex min-h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-sky-400 text-lg font-bold text-white">
            S
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-blue-700">
              SMANILUM
            </p>
            <p className="text-sm text-slate-500">News Portal</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 hover:border-blue-200 hover:text-blue-700 sm:inline-flex sm:items-center sm:gap-2"
          >
            <Search className="h-4 w-4" />
            Cari berita
          </Link>
          <Button href="/admin/login" variant="secondary" className="gap-2">
            <ShieldCheck className="h-4 w-4" />
            Admin
          </Button>
        </div>
      </div>
    </header>
  );
}
