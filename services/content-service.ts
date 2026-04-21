import { mockData } from "@/lib/mock-data";
import {
  getNumberSetting,
  mergeSiteSettings,
  type SiteSettingsMap,
} from "@/lib/settings";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabaseServer";
import { generateSlug } from "@/lib/utils";
import type {
  Announcement,
  Banner,
  CarouselItem,
  Category,
  Gallery,
  GalleryItem,
  HomePageData,
  PageContent,
  PaginatedResult,
  Post,
  SearchResult,
  SiteSetting,
} from "@/types";

function sortByPublishedDesc<T extends { published_at?: string | null }>(items: T[]) {
  return [...items].sort((a, b) => {
    return new Date(b.published_at || 0).getTime() - new Date(a.published_at || 0).getTime();
  });
}

function toSettingMap() {
  return mergeSiteSettings(
    mockData.siteSettings.reduce<Record<string, string>>((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {}),
  );
}

function normalizeSettingRows(
  rows: { key: string; value: string }[] | null | undefined,
): SiteSettingsMap {
  return mergeSiteSettings(
    (rows || []).reduce<Record<string, string>>((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {}),
  );
}

export async function getSiteSettingsMap(): Promise<SiteSettingsMap> {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    try {
      const { data } = await supabase.from("site_settings").select("key, value");
      return normalizeSettingRows(data || []);
    } catch {
      // ignore
    }
  }

  return toSettingMap();
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

    const settings = normalizeSettingRows(settingsRes.data || []);

    const posts = (postsRes.data as Post[]) || [];
    const featuredLimit = getNumberSetting(settings, "featured_limit", 4);
    const latestLimit = getNumberSetting(settings, "latest_limit", 8);
    const announcementsLimit = getNumberSetting(
      settings,
      "announcements_limit",
      4,
    );
    const galleryLimit = getNumberSetting(settings, "gallery_limit", 4);

    return {
      banner: (bannerRes.data as Banner | null) || null,
      carousel: (carouselRes.data as CarouselItem[]) || [],
      featuredPosts: posts
        .filter((post) => post.is_featured)
        .slice(0, featuredLimit),
      latestPosts: posts.slice(0, latestLimit),
      trendingPosts: posts.slice(0, 5),
      categories: (categoriesRes.data as Category[]) || [],
      announcements: ((announcementsRes.data as Announcement[]) || []).slice(
        0,
        announcementsLimit,
      ),
      galleries: ((galleriesRes.data as Gallery[]) || []).slice(0, galleryLimit),
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
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    try {
      let builder = supabase
        .from("posts")
        .select("*, category:categories(*)")
        .neq("slug", post.slug)
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(limit);

      if (post.category_id) {
        builder = builder.eq("category_id", post.category_id);
      }

      const { data } = await builder;
      if (data && data.length > 0) {
        return data as Post[];
      }

      const { data: fallbackData } = await supabase
        .from("posts")
        .select("*, category:categories(*)")
        .neq("slug", post.slug)
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(limit);

      if (fallbackData) {
        return fallbackData as Post[];
      }
    } catch {
      // ignore
    }
  }

  const items = mockData.posts
    .filter((candidate) => candidate.slug !== post.slug && candidate.category_id === post.category_id)
    .slice(0, limit);

  if (items.length > 0) return items;

  return mockData.posts.filter((candidate) => candidate.slug !== post.slug).slice(0, limit);
}

export async function getCategories() {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    try {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });

      if (data) return data as Category[];
    } catch {
      // ignore
    }
  }

  return mockData.categories;
}

export async function getCategoryBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    try {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (data) return data as Category;
    } catch {
      // ignore
    }
  }

  return mockData.categories.find((category) => category.slug === slug) || null;
}

export async function getGalleries() {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    try {
      const { data } = await supabase
        .from("galleries")
        .select("*")
        .order("published_at", { ascending: false });

      if (data) return data as Gallery[];
    } catch {
      // ignore
    }
  }

  return mockData.galleries;
}

export async function getGalleryBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    try {
      const { data: gallery } = await supabase
        .from("galleries")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (gallery) {
        const { data: items } = await supabase
          .from("gallery_items")
          .select("*")
          .eq("gallery_id", gallery.id)
          .order("created_at", { ascending: false });

        return {
          gallery: gallery as Gallery,
          items: (items as GalleryItem[]) || [],
        };
      }
    } catch {
      // ignore
    }
  }

  const gallery = mockData.galleries.find((item) => item.slug === slug) || null;
  const items = mockData.galleryItems.filter((item) => item.gallery_id === gallery?.id);
  return { gallery, items };
}

export async function getPages() {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    try {
      const { data } = await supabase
        .from("pages")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (data) return data as PageContent[];
    } catch {
      // ignore
    }
  }

  return mockData.pages.filter((page) => page.is_published);
}

export async function getPageBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    try {
      const { data } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (data) return data as PageContent;
    } catch {
      // ignore
    }
  }

  return mockData.pages.find((page) => page.slug === slug && page.is_published) || null;
}

export async function searchContent(query: string): Promise<SearchResult> {
  const keyword = query.toLowerCase();
  const supabase = await createSupabaseServerClient();

  if (supabase && query.trim()) {
    try {
      const [postsRes, categoriesRes] = await Promise.all([
        supabase
          .from("posts")
          .select("*, category:categories(*)")
          .eq("is_published", true)
          .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
          .order("published_at", { ascending: false })
          .limit(12),
        supabase
          .from("categories")
          .select("*")
          .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
          .order("name", { ascending: true })
          .limit(8),
      ]);

      return {
        posts: (postsRes.data as Post[]) || [],
        categories: (categoriesRes.data as Category[]) || [],
      };
    } catch {
      // ignore
    }
  }

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
  const supabase = createSupabaseAdminClient();

  if (supabase) {
    try {
      const [postsRes, categoriesRes, bannersRes, carouselRes, galleriesRes, pagesRes, announcementsRes, settingsRes] =
        await Promise.all([
          supabase.from("posts").select("*, category:categories(*)").order("created_at", { ascending: false }),
          supabase.from("categories").select("*").order("name", { ascending: true }),
          supabase.from("banners").select("*").order("created_at", { ascending: false }),
          supabase.from("carousel").select("*").order("order_number", { ascending: true }),
          supabase.from("galleries").select("*").order("published_at", { ascending: false }),
          supabase.from("pages").select("*").order("created_at", { ascending: false }),
          supabase.from("announcements").select("*").order("published_at", { ascending: false }),
          supabase.from("site_settings").select("*").order("key", { ascending: true }),
        ]);

      return {
        posts: (postsRes.data as Post[]) || [],
        categories: (categoriesRes.data as Category[]) || [],
        banners: (bannersRes.data as Banner[]) || [],
        carousel: (carouselRes.data as CarouselItem[]) || [],
        galleries: (galleriesRes.data as Gallery[]) || [],
        pages: (pagesRes.data as PageContent[]) || [],
        announcements: (announcementsRes.data as Announcement[]) || [],
        settings: (settingsRes.data as SiteSetting[]) || [],
      };
    } catch {
      // ignore
    }
  }

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
