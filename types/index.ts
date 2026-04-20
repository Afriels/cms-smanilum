export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  color?: string | null;
  created_at?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url?: string | null;
  og_image_url?: string | null;
  category_id?: string | null;
  category?: Category | null;
  is_featured: boolean;
  is_published: boolean;
  published_at?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  author_name?: string | null;
  created_at?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string | null;
  image_url?: string | null;
  cta_label?: string | null;
  cta_href?: string | null;
  is_active: boolean;
  created_at?: string;
}

export interface CarouselItem {
  id: string;
  title: string;
  subtitle?: string | null;
  image_url?: string | null;
  href?: string | null;
  order_number: number;
  is_active: boolean;
  created_at?: string;
}

export interface Gallery {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  cover_image_url?: string | null;
  published_at?: string | null;
  created_at?: string;
}

export interface GalleryItem {
  id: string;
  gallery_id: string;
  title?: string | null;
  image_url: string;
  created_at?: string;
}

export interface PageContent {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  is_published: boolean;
  meta_title?: string | null;
  meta_description?: string | null;
  created_at?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  href?: string | null;
  is_published: boolean;
  published_at?: string | null;
  created_at?: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  group_name?: string | null;
}

export interface UserProfile {
  id: string;
  auth_user_id?: string | null;
  email: string;
  full_name?: string | null;
  role: "admin";
  created_at?: string;
}

export interface HomePageData {
  banner: Banner | null;
  carousel: CarouselItem[];
  featuredPosts: Post[];
  latestPosts: Post[];
  trendingPosts: Post[];
  categories: Category[];
  announcements: Announcement[];
  galleries: Gallery[];
  siteSettings: Record<string, string>;
}

export interface PaginatedResult<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface SearchResult {
  posts: Post[];
  categories: Category[];
}
