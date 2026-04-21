create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  email text not null unique,
  full_name text,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  color text,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  thumbnail_url text,
  og_image_url text,
  category_id uuid references public.categories(id) on delete set null,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  published_at timestamptz,
  meta_title text,
  meta_description text,
  author_name text default 'Admin',
  created_at timestamptz not null default now()
);

create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  image_url text,
  cta_label text,
  cta_href text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.carousel (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  image_url text,
  href text,
  order_number int not null default 1,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.galleries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  cover_image_url text,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  gallery_id uuid not null references public.galleries(id) on delete cascade,
  title text,
  image_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null default '',
  is_published boolean not null default false,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now()
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  href text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null default '',
  group_name text,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.banners enable row level security;
alter table public.carousel enable row level security;
alter table public.galleries enable row level security;
alter table public.gallery_items enable row level security;
alter table public.pages enable row level security;
alter table public.announcements enable row level security;
alter table public.site_settings enable row level security;

create policy "public read posts" on public.posts for select using (is_published = true);
create policy "public read categories" on public.categories for select using (true);
create policy "public read banners" on public.banners for select using (is_active = true);
create policy "public read carousel" on public.carousel for select using (is_active = true);
create policy "public read galleries" on public.galleries for select using (true);
create policy "public read gallery items" on public.gallery_items for select using (true);
create policy "public read pages" on public.pages for select using (is_published = true);
create policy "public read announcements" on public.announcements for select using (is_published = true);
create policy "public read settings" on public.site_settings for select using (true);

insert into storage.buckets (id, name, public)
values
  ('logos', 'logos', true),
  ('favicons', 'favicons', true),
  ('posts', 'posts', true),
  ('banners', 'banners', true),
  ('galleries', 'galleries', true)
on conflict (id) do nothing;

insert into public.site_settings (key, value, group_name)
values
  ('site_name', 'Smanilum News Portal', 'site'),
  ('site_tagline', 'Portal informasi sekolah modern', 'site'),
  ('site_description', 'Portal berita sekolah modern dengan tampilan profesional, cepat, dan siap dikelola melalui CMS internal.', 'site'),
  ('site_logo_url', '', 'site'),
  ('site_favicon_url', '', 'site'),
  ('contact_email', 'info@smanilum.sch.id', 'site'),
  ('contact_phone', '(0341) 123456', 'site'),
  ('address', 'Jl. Pendidikan No. 1, Jawa Timur', 'site'),
  ('hero_badge', 'Portal sekolah modern, cepat, dan profesional', 'homepage'),
  ('hero_secondary_cta_label', 'Profil Sekolah', 'homepage'),
  ('hero_secondary_cta_href', '/profil/tentang', 'homepage'),
  ('hero_card_1_title', 'Update Cepat', 'homepage'),
  ('hero_card_1_description', 'Berita utama, carousel, dan pengumuman terkelola.', 'homepage'),
  ('hero_card_2_title', 'Konten Terpadu', 'homepage'),
  ('hero_card_2_description', 'Berita, banner, halaman, dan galeri tersusun rapi dalam satu portal.', 'homepage'),
  ('hero_card_3_title', 'SEO Siap', 'homepage'),
  ('hero_card_3_description', 'Open Graph, Twitter Card, sitemap, dan metadata dinamis.', 'homepage'),
  ('carousel_badge', 'Highlight Utama', 'homepage'),
  ('carousel_cta_label', 'Buka cerita lengkap', 'homepage'),
  ('featured_eyebrow', 'Featured News', 'homepage'),
  ('featured_title', 'Sorotan utama dan berita unggulan sekolah', 'homepage'),
  ('featured_description', 'Konten penting tampil menonjol di beranda untuk menjaga arus informasi tetap jelas dan profesional.', 'homepage'),
  ('featured_limit', '4', 'homepage'),
  ('latest_eyebrow', 'Latest Update', 'homepage'),
  ('latest_title', 'Berita terbaru', 'homepage'),
  ('latest_description', 'Update kegiatan, akademik, kesiswaan, dan prestasi sekolah dalam tampilan cepat baca.', 'homepage'),
  ('latest_button_label', 'Lihat semua berita', 'homepage'),
  ('latest_button_href', '/berita', 'homepage'),
  ('latest_limit', '8', 'homepage'),
  ('categories_eyebrow', 'Kategori', 'homepage'),
  ('categories_title', 'Kategori berita', 'homepage'),
  ('categories_description', 'Navigasi cepat berdasarkan topik konten utama.', 'homepage'),
  ('announcements_eyebrow', 'Pengumuman', 'homepage'),
  ('announcements_title', 'Informasi penting sekolah', 'homepage'),
  ('announcements_description', 'Panel pengumuman dinamis yang dapat dikelola admin dari dashboard.', 'homepage'),
  ('announcements_limit', '4', 'homepage'),
  ('gallery_eyebrow', 'Galeri', 'homepage'),
  ('gallery_title', 'Dokumentasi kegiatan', 'homepage'),
  ('gallery_description', 'Album foto sekolah dengan detail album dan grid foto responsif.', 'homepage'),
  ('gallery_limit', '4', 'homepage'),
  ('trending_title', 'Trending Posts', 'homepage'),
  ('cta_eyebrow', 'Siap dipakai', 'homepage'),
  ('cta_title', 'Portal berita sekolah yang rapi, cepat, dan nyaman di semua perangkat', 'homepage'),
  ('cta_description', 'Tampilan publik difokuskan untuk berita, pengumuman, profil, dan galeri sekolah dengan pengalaman baca yang konsisten.', 'homepage'),
  ('cta_primary_label', 'Hubungi Sekolah', 'homepage'),
  ('cta_primary_href', '/kontak', 'homepage'),
  ('cta_secondary_label', 'Jelajahi Berita', 'homepage'),
  ('cta_secondary_href', '/berita', 'homepage'),
  ('footer_about_title', 'Smanilum News Portal', 'footer'),
  ('footer_about_description', 'Portal berita sekolah modern untuk publikasi kegiatan, prestasi, pengumuman, dan profil institusi dalam satu platform terpadu.', 'footer'),
  ('footer_nav_title', 'Navigasi', 'footer'),
  ('footer_nav_links', E'Berita|/berita\nGaleri|/galeri\nProfil|/profil/tentang\nKontak|/kontak', 'footer'),
  ('footer_contact_title', 'Kontak', 'footer'),
  ('footer_contact_lines', E'Jl. Pendidikan No. 1\ninfo@smanilum.sch.id\nDeploy-ready untuk Vercel + Supabase', 'footer'),
  ('footer_copyright', '© 2026 Smanilum News Portal. Semua hak dilindungi.', 'footer')
on conflict (key) do update set
  value = excluded.value,
  group_name = excluded.group_name;
