import clsx, { type ClassValue } from "clsx";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function generateSlug(value: string) {
  return slugify(value, { lower: true, strict: true, trim: true });
}

export function formatDate(value?: string | null) {
  if (!value) return "";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example-school-news.vercel.app"}${normalized}`;
}

export function truncate(value: string, length = 140) {
  if (value.length <= length) return value;
  return `${value.slice(0, length).trim()}...`;
}
