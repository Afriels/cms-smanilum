"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, ShieldCheck, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/berita", label: "Berita" },
  { href: "/galeri", label: "Galeri" },
  { href: "/profil/tentang", label: "Profil" },
  { href: "/kontak", label: "Kontak" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const showAdminButton = pathname !== "/";

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur-xl">
      <div className="container-shell flex min-h-18 items-center gap-3 py-3">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-sky-400 text-base font-bold text-white sm:h-11 sm:w-11 sm:text-lg">
            S
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold tracking-[0.16em] text-blue-700 sm:text-sm sm:tracking-[0.22em]">
              SMANILUM
            </p>
            <p className="truncate text-xs text-slate-500 sm:text-sm">News Portal</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-white/75 px-2 py-2 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700",
                  active && "bg-blue-600 text-white hover:bg-blue-600 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Button
            href="/search"
            variant="ghost"
            className="gap-2 border border-slate-200 bg-white/75 px-4 text-slate-600 hover:border-blue-200 hover:text-blue-700"
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">Cari berita</span>
          </Button>
          {showAdminButton ? (
            <Button href="/admin/login" variant="secondary" className="gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span className="hidden xl:inline">Admin</span>
              <span className="xl:hidden">Login</span>
            </Button>
          ) : null}
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          <button
            type="button"
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-slate-200/80 bg-white/95 sm:hidden">
          <div className="container-shell space-y-3 py-4">
            <Link
              href="/search"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
            >
              <Search className="h-4 w-4" />
              Cari berita
            </Link>
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700",
                  active && "border-blue-200 bg-blue-50 text-blue-700",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            {showAdminButton ? (
              <Button
                href="/admin/login"
                variant="secondary"
                className="w-full gap-2"
                onClick={() => setIsOpen(false)}
              >
                <ShieldCheck className="h-4 w-4" />
                Login Admin
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
