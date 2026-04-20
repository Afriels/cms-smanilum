import Link from "next/link";
import { LayoutDashboard, Newspaper, ImageIcon, PanelsTopLeft, Megaphone, Settings, FolderKanban, Tags, UploadCloud } from "lucide-react";

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
  return (
    <div className="container-shell grid gap-6 py-10 lg:grid-cols-[260px_1fr]">
      <aside className="surface-card h-fit p-5">
        <div className="mb-6 rounded-3xl bg-gradient-to-br from-blue-700 to-sky-400 p-5 text-white">
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
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h1>
          <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
        </div>
        {children}
      </section>
    </div>
  );
}
