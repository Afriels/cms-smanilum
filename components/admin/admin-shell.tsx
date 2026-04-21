"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  ImageIcon,
  LayoutDashboard,
  Megaphone,
  Menu,
  Newspaper,
  PanelsTopLeft,
  Settings,
  Tags,
  UploadCloud,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", icon: Newspaper },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/banners", label: "Banners", icon: PanelsTopLeft },
  { href: "/admin/carousel", label: "Carousel", icon: PanelsTopLeft },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/media", label: "Media Library", icon: UploadCloud },
  { href: "/admin/pages", label: "Pages", icon: FolderKanban },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export function AdminShell({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const nav = (
    <div className="surface-card h-fit p-4 sm:p-5">
      <div className="mb-5 rounded-3xl bg-gradient-to-br from-blue-700 to-sky-400 p-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
          Admin CMS
        </p>
        <h2 className="mt-2 text-xl font-semibold">Portal Sekolah</h2>
        <p className="mt-2 text-sm text-blue-50">
          Kelola semua konten dalam satu dashboard Next.js + Supabase.
        </p>
      </div>
      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700",
                active && "bg-blue-600 text-white hover:bg-blue-600 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="container-shell py-6 sm:py-8 lg:py-10">
      <div className="mb-6 flex items-start justify-between gap-4 lg:hidden">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
        </div>
        <button
          type="button"
          aria-label={isOpen ? "Tutup navigasi admin" : "Buka navigasi admin"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? <div className="mb-6 lg:hidden">{nav}</div> : null}

      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden lg:block">{nav}</aside>

        <section className="space-y-6 min-w-0">
          <div className="hidden lg:block">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
          </div>
          {children}
        </section>
      </div>
    </div>
  );
}
