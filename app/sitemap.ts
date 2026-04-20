import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { getGalleries, getPages, getPosts } from "@/services/content-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, galleries, pages] = await Promise.all([
    getPosts({ pageSize: 100 }),
    getGalleries(),
    getPages(),
  ]);

  const base = env.siteUrl;
  const staticRoutes = ["", "/berita", "/galeri", "/kontak", "/search"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
    })),
    ...posts.data.map((post) => ({
      url: `${base}/berita/${post.slug}`,
      lastModified: post.published_at ? new Date(post.published_at) : new Date(),
    })),
    ...galleries.map((gallery) => ({
      url: `${base}/galeri/${gallery.slug}`,
      lastModified: gallery.published_at ? new Date(gallery.published_at) : new Date(),
    })),
    ...pages.map((page) => ({
      url: `${base}/profil/${page.slug}`,
      lastModified: new Date(),
    })),
  ];
}
