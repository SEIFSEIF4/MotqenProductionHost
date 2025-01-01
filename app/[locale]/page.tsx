import React from "react";

import About from "@/components/home/about";
import Goals from "@/components/home/goals";
import Statics from "@/components/home/statics";
import Programs from "@/components/home/programs";
import Hero from "@/components/home/hero";
import News from "@/components/home/news";
import Said from "@/components/home/said";

import { PageWrapper } from "@/components/Wrapper";
import { getCarousel } from "@/sanity/lib/news/getCarousel";
import { getLocale } from "next-intl/server";
import { getTestimonial } from "@/sanity/lib/news/getTestimonial";
import { getNews } from "@/sanity/lib/news/getNews";

export const revalidate = 60;

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const [locale, initialCarousel, initialSaidItems, news] = await Promise.all([
    getLocale(),
    getCarousel(),
    getTestimonial(),
    getNews(),
  ]);

  return (
    <>
      <Hero locale={locale} initialCarousel={initialCarousel} />
      <PageWrapper className="relative z-50 -translate-y-8 rounded-t-[48px] bg-white md:-translate-y-10">
        <About locale={locale} />
        <Goals locale={locale} />
        <Statics />
        <Programs />
        <News newsItems={news} locale={locale} />
        <Said locale={locale} initialSaidItems={initialSaidItems} />
      </PageWrapper>
    </>
  );
}
