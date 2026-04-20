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
