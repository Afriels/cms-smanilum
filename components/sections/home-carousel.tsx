"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CarouselItem } from "@/types";

export function HomeCarousel({ items }: { items: CarouselItem[] }) {
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
    <section className="container-shell py-6">
      <div className="surface-card overflow-hidden">
        <div
          className="grid min-h-[420px] items-end bg-cover bg-center p-8 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(15,23,42,0.82), rgba(15,23,42,0.35)), url(${active.image_url || "/images/og-default.svg"})`,
          }}
        >
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
              Highlight Utama
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {active.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
              {active.subtitle}
            </p>
            <Link
              href={active.href || "/berita"}
              className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700"
            >
              Buka cerita lengkap
            </Link>
          </div>

          <div className="mt-8 flex items-end justify-between gap-3 lg:mt-0 lg:justify-end">
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-full bg-white/15 p-3 text-white hover:bg-white/25"
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
                className="rounded-full bg-white/15 p-3 text-white hover:bg-white/25"
                onClick={() => setActiveIndex((current) => (current + 1) % items.length)}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-2">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full ${
                    index === activeIndex ? "w-8 bg-white" : "w-2.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
