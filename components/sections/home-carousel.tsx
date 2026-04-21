"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getSetting, type SiteSettingsMap } from "@/lib/settings";
import type { CarouselItem } from "@/types";

export function HomeCarousel({
  items,
  settings,
}: {
  items: CarouselItem[];
  settings: SiteSettingsMap;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [items.length]);

  if (items.length === 0) return null;

  const active = items[activeIndex];

  return (
    <section className="container-shell py-4 sm:py-6">
      <div className="surface-card overflow-hidden">
        <div className="relative isolate min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]">
          <Image
            src={active.image_url || "/images/og-default.svg"}
            alt={active.title}
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 92vw, 1280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-slate-900/35" />
          <div className="relative z-10 grid h-full content-end gap-6 p-5 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-8 lg:p-10">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-200 sm:mb-4 sm:text-sm">
                {getSetting(settings, "carousel_badge")}
              </p>
              <h2 className="break-words text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {active.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200 sm:mt-4 sm:text-base sm:leading-7">
                {active.subtitle}
              </p>
              <Link
                href={active.href || "/berita"}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700 sm:mt-6 sm:w-auto"
              >
                {getSetting(settings, "carousel_cta_label")}
              </Link>
            </div>

            <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mt-0 lg:self-end">
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Slide sebelumnya"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
                  onClick={() =>
                    setActiveIndex((current) =>
                      current === 0 ? items.length - 1 : current - 1,
                    )
                  }
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Slide berikutnya"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
                  onClick={() => setActiveIndex((current) => (current + 1) % items.length)}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Buka slide ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-3 rounded-full transition-all ${
                      index === activeIndex ? "w-8 bg-white" : "w-3 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
