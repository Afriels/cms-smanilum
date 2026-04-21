import type { Metadata } from "next";
import { env } from "@/lib/env";
import { getSetting, type SiteSettingsMap } from "@/lib/settings";
import { absoluteUrl, truncate } from "@/lib/utils";

const fallbackImage = absoluteUrl("/images/og-default.svg");

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  settings,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string | null;
  type?: "website" | "article";
  settings?: SiteSettingsMap;
}): Metadata {
  const resolvedUrl = absoluteUrl(path);
  const resolvedImage = image || fallbackImage;
  const siteName = settings
    ? getSetting(settings, "site_name")
    : "Smanilum News Portal";

  return {
    title,
    description: truncate(description, 155),
    metadataBase: new URL(env.siteUrl),
    openGraph: {
      title,
      description: truncate(description, 155),
      url: resolvedUrl,
      siteName,
      images: [{ url: resolvedImage, width: 1200, height: 630, alt: title }],
      locale: "id_ID",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: truncate(description, 155),
      images: [resolvedImage],
    },
    alternates: {
      canonical: resolvedUrl,
    },
  };
}

export function createJsonLd(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data),
  };
}
