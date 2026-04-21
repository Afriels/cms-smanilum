export type SiteSettingsMap = Record<string, string>;

export const defaultSiteSettings: SiteSettingsMap = {
  site_name: "Smanilum News Portal",
  site_tagline: "Portal informasi sekolah modern",
  site_description:
    "Portal berita sekolah modern dengan tampilan profesional, cepat, dan siap dikelola melalui CMS internal.",
  site_logo_url: "",
  site_favicon_url: "",
  contact_email: "info@smanilum.sch.id",
  contact_phone: "(0341) 123456",
  address: "Jl. Pendidikan No. 1, Jawa Timur",
  hero_badge: "Portal sekolah modern, cepat, dan profesional",
  hero_secondary_cta_label: "Profil Sekolah",
  hero_secondary_cta_href: "/profil/tentang",
  hero_card_1_title: "Update Cepat",
  hero_card_1_description: "Berita utama, carousel, dan pengumuman terkelola.",
  hero_card_2_title: "Konten Terpadu",
  hero_card_2_description:
    "Berita, banner, halaman, dan galeri tersusun rapi dalam satu portal.",
  hero_card_3_title: "SEO Siap",
  hero_card_3_description:
    "Open Graph, Twitter Card, sitemap, dan metadata dinamis.",
  carousel_badge: "Highlight Utama",
  carousel_cta_label: "Buka cerita lengkap",
  featured_eyebrow: "Featured News",
  featured_title: "Sorotan utama dan berita unggulan sekolah",
  featured_description:
    "Konten penting tampil menonjol di beranda untuk menjaga arus informasi tetap jelas dan profesional.",
  featured_limit: "4",
  latest_eyebrow: "Latest Update",
  latest_title: "Berita terbaru",
  latest_description:
    "Update kegiatan, akademik, kesiswaan, dan prestasi sekolah dalam tampilan cepat baca.",
  latest_button_label: "Lihat semua berita",
  latest_button_href: "/berita",
  latest_limit: "8",
  categories_eyebrow: "Kategori",
  categories_title: "Kategori berita",
  categories_description: "Navigasi cepat berdasarkan topik konten utama.",
  announcements_eyebrow: "Pengumuman",
  announcements_title: "Informasi penting sekolah",
  announcements_description:
    "Panel pengumuman dinamis yang dapat dikelola admin dari dashboard.",
  announcements_limit: "4",
  gallery_eyebrow: "Galeri",
  gallery_title: "Dokumentasi kegiatan",
  gallery_description:
    "Album foto sekolah dengan detail album dan grid foto responsif.",
  gallery_limit: "4",
  trending_title: "Trending Posts",
  cta_eyebrow: "Siap dipakai",
  cta_title:
    "Portal berita sekolah yang rapi, cepat, dan nyaman di semua perangkat",
  cta_description:
    "Tampilan publik difokuskan untuk berita, pengumuman, profil, dan galeri sekolah dengan pengalaman baca yang konsisten.",
  cta_primary_label: "Hubungi Sekolah",
  cta_primary_href: "/kontak",
  cta_secondary_label: "Jelajahi Berita",
  cta_secondary_href: "/berita",
  footer_about_title: "Smanilum News Portal",
  footer_about_description:
    "Portal berita sekolah modern untuk publikasi kegiatan, prestasi, pengumuman, dan profil institusi dalam satu platform terpadu.",
  footer_nav_title: "Navigasi",
  footer_nav_links:
    "Berita|/berita\nGaleri|/galeri\nProfil|/profil/tentang\nKontak|/kontak",
  footer_contact_title: "Kontak",
  footer_contact_lines:
    "Jl. Pendidikan No. 1\ninfo@smanilum.sch.id\nDeploy-ready untuk Vercel + Supabase",
  footer_copyright: "© 2026 Smanilum News Portal. Semua hak dilindungi.",
};

export function mergeSiteSettings(
  settings?: SiteSettingsMap | null,
): SiteSettingsMap {
  return {
    ...defaultSiteSettings,
    ...(settings || {}),
  };
}

export function getSetting(settings: SiteSettingsMap, key: string) {
  return settings[key] || defaultSiteSettings[key] || "";
}

export function getNumberSetting(
  settings: SiteSettingsMap,
  key: string,
  fallback: number,
) {
  const raw = Number(settings[key]);
  return Number.isFinite(raw) && raw > 0 ? raw : fallback;
}

export function parseLinkList(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, href] = line.split("|");
      return {
        label: label?.trim() || "",
        href: href?.trim() || "#",
      };
    })
    .filter((item) => item.label);
}

export function parseLineList(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}
