import type { Metadata } from "next";
import "./globals.css";
import { createMetadata } from "@/lib/site";
import { getSiteSettingsMap } from "@/services/content-service";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettingsMap();
  const metadata = createMetadata({
    title: settings.site_name,
    description: settings.site_description,
    settings,
  });

  const favicon = settings.site_favicon_url;
  const logo = settings.site_logo_url || favicon || undefined;

  return {
    ...metadata,
    icons: favicon
      ? {
          icon: [{ url: favicon }],
          shortcut: [{ url: favicon }],
          apple: logo ? [{ url: logo }] : undefined,
        }
      : metadata.icons,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
