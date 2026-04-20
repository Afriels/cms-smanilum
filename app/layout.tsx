import type { Metadata } from "next";
import "./globals.css";
import { createMetadata } from "@/lib/site";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = createMetadata({
  title: "Smanilum News Portal",
  description:
    "Portal berita sekolah modern dengan tampilan profesional, cepat, dan siap dikelola melalui CMS internal.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="antialiased">
      <body className="min-h-screen">
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
