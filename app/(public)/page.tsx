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
import { getSetting } from "@/lib/settings";
import { getHomePageData } from "@/services/content-service";

export default async function HomePage() {
  const data = await getHomePageData();
  const settings = data.siteSettings;

  return (
    <>
      <HeroBanner banner={data.banner} settings={settings} />
      <HomeCarousel items={data.carousel} settings={settings} />

      <section className="container-shell py-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <SectionHeading
              eyebrow={getSetting(settings, "featured_eyebrow")}
              title={getSetting(settings, "featured_title")}
              description={getSetting(settings, "featured_description")}
            />
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {data.featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
          <TrendingSidebar posts={data.trendingPosts} settings={settings} />
        </div>
      </section>

      <section className="container-shell py-6 sm:py-8">
        <SectionHeading
          eyebrow={getSetting(settings, "latest_eyebrow")}
          title={getSetting(settings, "latest_title")}
          description={getSetting(settings, "latest_description")}
        />
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.latestPosts.map((post) => (
            <PostCard key={post.id} post={post} compact />
          ))}
        </div>
        <div className="mt-8">
          <Button href={getSetting(settings, "latest_button_href")}>
            {getSetting(settings, "latest_button_label")}
          </Button>
        </div>
      </section>

      <section className="container-shell py-6 sm:py-8">
        <SectionHeading
          eyebrow={getSetting(settings, "categories_eyebrow")}
          title={getSetting(settings, "categories_title")}
          description={getSetting(settings, "categories_description")}
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

      <section className="container-shell py-6 sm:py-8">
        <SectionHeading
          eyebrow={getSetting(settings, "announcements_eyebrow")}
          title={getSetting(settings, "announcements_title")}
          description={getSetting(settings, "announcements_description")}
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {data.announcements.map((item) => (
            <AnnouncementCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="container-shell py-6 sm:py-8">
        <SectionHeading
          eyebrow={getSetting(settings, "gallery_eyebrow")}
          title={getSetting(settings, "gallery_title")}
          description={getSetting(settings, "gallery_description")}
        />
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {data.galleries.map((gallery) => (
            <GalleryCard key={gallery.id} gallery={gallery} />
          ))}
        </div>
      </section>

      <CtaSection settings={settings} />
    </>
  );
}
