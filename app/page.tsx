import { AnnouncementCard } from "@/components/cards/announcement-card";
import { GalleryCard } from "@/components/cards/gallery-card";
import { PostCard } from "@/components/cards/post-card";
import Link from "next/link";
import { CtaSection } from "@/components/sections/cta-section";
import { HeroBanner } from "@/components/sections/hero-banner";
import { HomeCarousel } from "@/components/sections/home-carousel";
import { SectionHeading } from "@/components/sections/section-heading";
import { TrendingSidebar } from "@/components/sections/trending-sidebar";
import { Button } from "@/components/ui/button";
import { getHomePageData } from "@/services/content-service";

export default async function HomePage() {
  const data = await getHomePageData();

  return (
    <>
      <HeroBanner banner={data.banner} />
      <HomeCarousel items={data.carousel} />

      <section className="container-shell py-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <SectionHeading
              eyebrow="Featured News"
              title="Sorotan utama dan berita unggulan sekolah"
              description="Konten penting tampil menonjol di beranda untuk menjaga arus informasi tetap jelas dan profesional."
            />
            <div className="grid gap-6 md:grid-cols-2">
              {data.featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
          <TrendingSidebar posts={data.trendingPosts} />
        </div>
      </section>

      <section className="container-shell py-8">
        <SectionHeading
          eyebrow="Latest Update"
          title="Berita terbaru"
          description="Update kegiatan, akademik, kesiswaan, dan prestasi sekolah dalam tampilan cepat baca."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {data.latestPosts.map((post) => (
            <PostCard key={post.id} post={post} compact />
          ))}
        </div>
        <div className="mt-8">
          <Button href="/berita">Lihat semua berita</Button>
        </div>
      </section>

      <section className="container-shell py-8">
        <SectionHeading
          eyebrow="Kategori"
          title="Kategori berita"
          description="Navigasi cepat berdasarkan topik konten utama."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.categories.map((category) => (
            <Link
              key={category.id}
              href={`/kategori/${category.slug}`}
              className="surface-card p-6"
            >
              <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-shell py-8">
        <SectionHeading
          eyebrow="Pengumuman"
          title="Informasi penting sekolah"
          description="Panel pengumuman dinamis yang dapat dikelola admin dari dashboard."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {data.announcements.map((item) => (
            <AnnouncementCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="container-shell py-8">
        <SectionHeading
          eyebrow="Galeri"
          title="Dokumentasi kegiatan"
          description="Album foto sekolah dengan detail album dan grid foto responsif."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {data.galleries.map((gallery) => (
            <GalleryCard key={gallery.id} gallery={gallery} />
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
