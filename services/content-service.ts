import { mockData } from "@/lib/mock-data";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { generateSlug } from "@/lib/utils";
import type {
  Announcement,
  Banner,
  CarouselItem,
  Category,
  Gallery,
  HomePageData,
  PaginatedResult,
  Post,
} from "@/types";

function sortByPublishedDesc<T extends { published_at?: string | null }>(items: T[]) {
  return [...items].sort((a, b) => {
    return new Date(b.published_at || 0).getTime() - new Date(a.published_at || 0).getTime();
  });
}

function toSettingMap() {
  return mockData.siteSettings.reduce<Record<string, string>>((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
}

export async function getHomePageData(): Promise<HomePageData> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      banner: mockData.banner,
      carousel: mockData.carousel,
      featuredPosts: mockData.posts.filter((post) => post.is_featured),
      latestPosts: sortByPublishedDesc(mockData.posts),
      trendingPosts: mockData.posts.slice(0, 3),
      categories: mockData.categories,
      announcements: mockData.announcements,
      galleries: mockData.galleries,
      siteSettings: toSettingMap(),
    };
  }

  try {
    const [bannerRes, carouselRes, postsRes, categoriesRes, announcementsRes, galleriesRes, settingsRes] =
      await Promise.all([
        supabase.from("banners").select("*").eq("is_active", true).order("created_at", { ascending: false }).limit(1).maybeSingle(),
        supabase.from("carousel").select("*").eq("is_active", true).order("order_number", { ascending: true }),
        supabase.from("posts").select("*, category:categories(*)").eq("is_published", true).order("published_at", { ascending: false }),
        supabase.from("categories").select("*").order("name", { ascending: true }),
        supabase.from("announcements").select("*").eq("is_published", true).order("published_at", { ascending: false }),
        supabase.from("galleries").select("*").order("published_at", { ascending: false }),
        supabase.from("site_settings").select("*"),
      ]);

    const settings = (settingsRes.data || []).reduce<Record<string, string>>((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    const posts = (postsRes.data as Post[]) || [];

    return {
      banner: (bannerRes.data as Banner | null) || null,
      carousel: (carouselRes.data as CarouselItem[]) || [],
      featuredPosts: posts.filter((post) => post.is_featured).slice(0, 4),
      latestPosts: posts.slice(0, 8),
      trendingPosts: posts.slice(0, 5),
      categories: (categoriesRes.data as Category[]) || [],
      announcements: (announcementsRes.data as Announcement[]) || [],
      galleries: (galleriesRes.data as Gallery[]) || [],
      siteSettings: settings,
    };
  } catch {
    return {
      banner: mockData.banner,
      carousel: mockData.carousel,
      featuredPosts: mockData.posts.filter((post) => post.is_featured),
      latestPosts: sortByPublishedDesc(mockData.posts),
      trendingPosts: mockData.posts.slice(0, 3),
      categories: mockData.categories,
      announcements: mockData.announcements,
      galleries: mockData.galleries,
      siteSettings: toSettingMap(),
    };
  }
}

export async function getPosts({
  page = 1,
  pageSize = 9,
  categorySlug,
  query,
}: {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
  query?: string;
}): Promise<PaginatedResult<Post>> {
  const supabase = await createSupabaseServerClient();
  let items = mockData.posts.filter((post) => post.is_published);

  if (categorySlug) {
    items = items.filter((post) => post.category?.slug === categorySlug);
  }

  if (query) {
    const keyword = query.toLowerCase();
    items = items.filter(
      (post) =>
        post.title.toLowerCase().includes(keyword) ||
        post.excerpt.toLowerCase().includes(keyword) ||
        post.content.toLowerCase().includes(keyword),
    );
  }

  if (supabase) {
    try {
      let builder = supabase
        .from("posts")
        .select("*, category:categories(*)", { count: "exact" })
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (categorySlug) {
        const { data: category } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", categorySlug)
          .maybeSingle();

        if (category?.id) {
          builder = builder.eq("category_id", category.id);
        }
      }

      if (query) {
        builder = builder.or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`);
      }

      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, count } = await builder.range(from, to);

      if (data) {
        return {
          data: data as Post[],
          page,
          pageSize,
          total: count || data.length,
          totalPages: Math.max(1, Math.ceil((count || data.length) / pageSize)),
        };
      }
    } catch {
      // fall back to mock data
    }
  }

  const total = items.length;
  const start = (page - 1) * pageSize;

  return {
    data: items.slice(start, start + pageSize),
    page,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getPostBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    try {
      const { data } = await supabase
        .from("posts")
        .select("*, category:categories(*)")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (data) return data as Post;
    } catch {
      // ignore
    }
  }

  return mockData.posts.find((post) => post.slug === slug) || null;
}

export async function getRelatedPosts(post: Post, limit = 3) {
  const items = mockData.posts
    .filter((candidate) => candidate.slug !== post.slug && candidate.category_id === post.category_id)
    .slice(0, limit);

  if (items.length > 0) return items;

  return mockData.posts.filter((candidate) => candidate.slug !== post.slug).slice(0, limit);
}

export async function getCategories() {
  return mockData.categories;
}

export async function getCategoryBySlug(slug: string) {
  return mockData.categories.find((category) => category.slug === slug) || null;
}

export async function getGalleries() {
  return mockData.galleries;
}

export async function getGalleryBySlug(slug: string) {
  const gallery = mockData.galleries.find((item) => item.slug === slug) || null;
  const items = mockData.galleryItems.filter((item) => item.gallery_id === gallery?.id);
  return { gallery, items };
}

export async function getPages() {
  return mockData.pages.filter((page) => page.is_published);
}

export async function getPageBySlug(slug: string) {
  return mockData.pages.find((page) => page.slug === slug && page.is_published) || null;
}

export async function searchContent(query: string) {
  const keyword = query.toLowerCase();

  return {
    posts: mockData.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(keyword) ||
        post.excerpt.toLowerCase().includes(keyword),
    ),
    categories: mockData.categories.filter((category) =>
      category.name.toLowerCase().includes(keyword),
    ),
  };
}

export async function getAdminCollections() {
  return {
    posts: mockData.posts,
    categories: mockData.categories,
    banners: [mockData.banner],
    carousel: mockData.carousel,
    galleries: mockData.galleries,
    pages: mockData.pages,
    announcements: mockData.announcements,
    settings: mockData.siteSettings,
  };
}

export function buildPostPayload(payload: Partial<Post>) {
  const title = payload.title?.trim() || "Untitled Post";
  return {
    title,
    slug: payload.slug?.trim() || generateSlug(title),
    excerpt: payload.excerpt?.trim() || "",
    content: payload.content?.trim() || "",
    thumbnail_url: payload.thumbnail_url || null,
    og_image_url: payload.og_image_url || payload.thumbnail_url || null,
    category_id: payload.category_id || null,
    is_featured: Boolean(payload.is_featured),
    is_published: Boolean(payload.is_published),
    published_at: payload.is_published
      ? payload.published_at || new Date().toISOString()
      : null,
    meta_title: payload.meta_title?.trim() || title,
    meta_description: payload.meta_description?.trim() || payload.excerpt?.trim() || "",
    author_name: payload.author_name?.trim() || "Admin",
  };
}
