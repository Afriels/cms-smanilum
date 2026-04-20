# Smanilum News Portal

Portal berita sekolah modern dalam satu project Next.js fullstack. Semua logic frontend, API route, admin dashboard, metadata SEO, dan integrasi Supabase berada di satu repo tanpa backend terpisah.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- Supabase: database, storage, auth
- Deploy ke Vercel
- GitHub-ready

## Struktur Project

```txt
app/
components/
hooks/
lib/
public/
services/
supabase/
types/
middleware.ts
```

## Fitur Utama

- Homepage dengan hero banner, carousel, featured posts, berita terbaru, kategori, trending posts, pengumuman, galeri, CTA, dan footer lengkap
- Halaman berita dengan slug SEO-friendly, related posts, share actions, breadcrumb, search, dan pagination
- Kategori dinamis, galeri album, halaman profil statis, kontak, loading skeleton, error page, dan custom 404
- Admin dashboard di `/admin` untuk posts, categories, banners, carousel, gallery, pages, announcements, dan site settings
- Upload file ke Supabase Storage melalui API route `/api/upload`
- Metadata dinamis: Open Graph, Twitter Card, sitemap, robots, canonical URL
- Fallback mock content ketika env Supabase belum diisi agar build tetap aman

## Environment Variables

Salin `.env.example` ke `.env.local`:

```bash
cp .env.example .env.local
```

Isi minimal:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_EMAIL=admin@your-school.sch.id
```

## Setup Supabase

1. Buat project Supabase baru.
2. Jalankan SQL di [supabase/schema.sql](./supabase/schema.sql).
3. Buat satu user admin di Supabase Auth.
4. Tambahkan row ke tabel `users` dengan `auth_user_id`, `email`, dan `role = 'admin'`.
5. Pastikan bucket storage `logos`, `favicons`, `posts`, `banners`, dan `galleries` tersedia.

## Menjalankan Project

```bash
npm install
npm run dev
```

Project akan berjalan di `http://localhost:3000` saat development lokal. Untuk produksi, gunakan `NEXT_PUBLIC_SITE_URL` domain Vercel Anda.

## Endpoint API Internal

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET|POST|DELETE /api/posts`
- `GET|POST|DELETE /api/categories`
- `GET|POST|DELETE /api/banners`
- `GET|POST|DELETE /api/carousel`
- `GET|POST|DELETE /api/galleries`
- `GET|POST|DELETE /api/pages`
- `GET|POST|DELETE /api/announcements`
- `GET|POST|DELETE /api/site-settings`
- `GET /api/search?q=...`
- `POST /api/upload`

## Admin Dashboard

- Login admin: `/admin/login`
- Dashboard overview: `/admin`
- CRUD cepat: `/admin/posts`, `/admin/categories`, `/admin/banners`, `/admin/carousel`, `/admin/gallery`, `/admin/pages`, `/admin/announcements`, `/admin/settings`

Catatan:

- Saat env Supabase belum tersedia, area admin tetap bisa dirender sebagai demo UI.
- Untuk autentikasi nyata, isi env Supabase dan buat akun admin di Supabase Auth.

## Upload File

Gunakan `multipart/form-data` ke `/api/upload` dengan field:

- `file`
- `bucket`
- `folder`
- `replacePath` opsional untuk mengganti file lama

Server akan:

- memvalidasi tipe file
- memvalidasi ukuran file
- upload ke Supabase Storage
- mengembalikan `publicUrl` dan `filePath`

## Deploy ke Vercel

1. Push repo ke GitHub.
2. Import repo di Vercel.
3. Isi environment variables yang sama seperti `.env.local`.
4. Deploy.
5. Pastikan `NEXT_PUBLIC_SITE_URL` diisi dengan domain final Vercel agar OG metadata dan canonical URL absolut benar.

## Testing Checklist

1. Buka homepage dan pastikan hero, carousel, featured posts, kategori, pengumuman, dan galeri tampil.
2. Buka detail berita dan cek metadata OG/Twitter menggunakan preview debugger.
3. Uji pencarian di `/search`.
4. Uji pagination di `/berita?page=2`.
5. Login di `/admin/login` dengan akun admin Supabase.
6. Tambah post baru dari `/admin/posts`.
7. Upload gambar melalui `/api/upload`.
8. Verifikasi post featured tampil di homepage.
9. Jalankan build produksi dengan `npm run build`.

## GitHub Ready

- `.gitignore` dari Next.js sudah aktif
- `.env.example` tersedia
- tidak ada secret yang disimpan ke repo
- source code siap dipush ke GitHub
