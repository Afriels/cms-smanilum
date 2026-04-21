import type {
  Announcement,
  Banner,
  CarouselItem,
  Category,
  Gallery,
  GalleryItem,
  PageContent,
  Post,
  SiteSetting,
} from "@/types";
import { defaultSiteSettings } from "@/lib/settings";

const categories: Category[] = [
  {
    id: "cat-1",
    name: "Akademik",
    slug: "akademik",
    description: "Berita prestasi akademik dan kegiatan belajar.",
    color: "#1d4ed8",
  },
  {
    id: "cat-2",
    name: "Kesiswaan",
    slug: "kesiswaan",
    description: "Kegiatan OSIS, organisasi, dan pengembangan karakter.",
    color: "#2563eb",
  },
  {
    id: "cat-3",
    name: "Prestasi",
    slug: "prestasi",
    description: "Capaian siswa dan guru di tingkat lokal hingga nasional.",
    color: "#3b82f6",
  },
];

const posts: Post[] = [
  {
    id: "post-1",
    title: "Tim Olimpiade Sains Raih Juara Nasional 2026",
    slug: "tim-olimpiade-sains-raih-juara-nasional-2026",
    excerpt:
      "Siswa-siswi terbaik sekolah membawa pulang medali emas dan perak dalam ajang olimpiade nasional.",
    content:
      "Portal ini sudah menyiapkan struktur berita lengkap. Sambungkan Supabase untuk mengganti data demo dengan data produksi dan kelola kontennya dari dashboard admin.",
    thumbnail_url: "/images/demo-post-1.svg",
    og_image_url: "/images/demo-post-1.svg",
    category_id: "cat-3",
    category: categories[2],
    is_featured: true,
    is_published: true,
    published_at: "2026-04-18T09:00:00.000Z",
    meta_title: "Tim Olimpiade Sains Raih Juara Nasional 2026",
    meta_description:
      "Prestasi membanggakan dari siswa sekolah dalam olimpiade sains nasional tahun 2026.",
    author_name: "Humas Sekolah",
  },
  {
    id: "post-2",
    title: "Program Kelas Digital Resmi Diluncurkan Semester Ini",
    slug: "program-kelas-digital-resmi-diluncurkan-semester-ini",
    excerpt:
      "Transformasi pembelajaran digital menjadi fokus utama sekolah untuk tahun ajaran baru.",
    content:
      "Program kelas digital menghadirkan perangkat pembelajaran modern, integrasi LMS, dan evaluasi berbasis data.",
    thumbnail_url: "/images/demo-post-2.svg",
    og_image_url: "/images/demo-post-2.svg",
    category_id: "cat-1",
    category: categories[0],
    is_featured: true,
    is_published: true,
    published_at: "2026-04-17T08:00:00.000Z",
    meta_title: "Program Kelas Digital Resmi Diluncurkan",
    meta_description:
      "Sekolah memperkenalkan kelas digital untuk mendukung pembelajaran yang lebih modern dan efektif.",
    author_name: "Admin Akademik",
  },
  {
    id: "post-3",
    title: "OSIS Gelar Pekan Kepemimpinan dan Literasi",
    slug: "osis-gelar-pekan-kepemimpinan-dan-literasi",
    excerpt:
      "Agenda kesiswaan memadukan pelatihan kepemimpinan, literasi, dan proyek sosial.",
    content:
      "Pekan kepemimpinan menjadi wadah penguatan karakter dan kolaborasi antarsiswa lintas kelas.",
    thumbnail_url: "/images/demo-post-3.svg",
    og_image_url: "/images/demo-post-3.svg",
    category_id: "cat-2",
    category: categories[1],
    is_featured: false,
    is_published: true,
    published_at: "2026-04-16T07:00:00.000Z",
    meta_title: "OSIS Gelar Pekan Kepemimpinan",
    meta_description:
      "OSIS menghadirkan agenda inspiratif untuk membangun budaya literasi dan kepemimpinan siswa.",
    author_name: "Pembina OSIS",
  },
];

const banner: Banner = {
  id: "banner-1",
  title: "Portal Berita Sekolah Modern",
  subtitle:
    "Informasi cepat, terpercaya, dan profesional untuk seluruh warga sekolah.",
  image_url: "/images/demo-banner.svg",
  cta_label: "Lihat Berita Terbaru",
  cta_href: "/berita",
  is_active: true,
};

const carousel: CarouselItem[] = posts.slice(0, 3).map((post, index) => ({
  id: `carousel-${index + 1}`,
  title: post.title,
  subtitle: post.excerpt,
  image_url: post.thumbnail_url,
  href: `/berita/${post.slug}`,
  order_number: index + 1,
  is_active: true,
}));

const galleries: Gallery[] = [
  {
    id: "gallery-1",
    title: "Graduation Day 2026",
    slug: "graduation-day-2026",
    description: "Dokumentasi kelulusan dan apresiasi siswa berprestasi.",
    cover_image_url: "/images/demo-gallery-1.svg",
    published_at: "2026-04-10T07:00:00.000Z",
  },
  {
    id: "gallery-2",
    title: "Campus Expo dan Career Day",
    slug: "campus-expo-dan-career-day",
    description: "Suasana pameran kampus dan karier di aula utama.",
    cover_image_url: "/images/demo-gallery-2.svg",
    published_at: "2026-04-08T07:00:00.000Z",
  },
];

const galleryItems: GalleryItem[] = [
  {
    id: "g-item-1",
    gallery_id: "gallery-1",
    title: "Prosesi Wisuda",
    image_url: "/images/demo-gallery-1.svg",
  },
  {
    id: "g-item-2",
    gallery_id: "gallery-1",
    title: "Sesi Penghargaan",
    image_url: "/images/demo-gallery-2.svg",
  },
];

const pages: PageContent[] = [
  {
    id: "page-1",
    title: "Tentang Sekolah",
    slug: "tentang",
    excerpt: "Profil singkat sekolah modern yang unggul dan berkarakter.",
    content:
      "Halaman profil dapat dikelola dari dashboard admin. Konten ini adalah fallback agar deployment tetap aman sebelum Supabase dihubungkan.",
    is_published: true,
    meta_title: "Tentang Sekolah",
    meta_description: "Profil sekolah modern, visi, misi, dan budaya belajar.",
  },
  {
    id: "page-2",
    title: "Visi Misi",
    slug: "visi-misi",
    excerpt: "Arah dan semangat pendidikan sekolah.",
    content:
      "Visi dan misi sekolah menekankan integritas, prestasi, dan inovasi pembelajaran.",
    is_published: true,
    meta_title: "Visi Misi Sekolah",
    meta_description: "Visi misi sekolah modern untuk masa depan pendidikan.",
  },
];

const announcements: Announcement[] = [
  {
    id: "ann-1",
    title: "Pendaftaran ekstrakurikuler dibuka hingga 30 April 2026",
    content: "Siswa dapat mendaftar melalui wali kelas atau dashboard siswa.",
    href: "/kontak",
    is_published: true,
    published_at: "2026-04-15T07:00:00.000Z",
  },
  {
    id: "ann-2",
    title: "Ujian tengah semester dimulai 5 Mei 2026",
    content: "Jadwal lengkap tersedia melalui wali kelas dan papan pengumuman.",
    is_published: true,
    published_at: "2026-04-14T07:00:00.000Z",
  },
];

const siteSettings: SiteSetting[] = Object.entries(defaultSiteSettings).map(
  ([key, value], index) => ({
    id: `set-${index + 1}`,
    key,
    value,
    group_name: key.startsWith("footer_")
      ? "footer"
      : key.startsWith("cta_") ||
          key.startsWith("hero_") ||
          key.startsWith("carousel_") ||
          key.startsWith("featured_") ||
          key.startsWith("latest_") ||
          key.startsWith("announcements_") ||
          key.startsWith("gallery_") ||
          key.startsWith("categories_") ||
          key.startsWith("trending_")
        ? "homepage"
        : "site",
  }),
);

export const mockData = {
  banner,
  carousel,
  posts,
  categories,
  galleries,
  galleryItems,
  pages,
  announcements,
  siteSettings,
};
