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

export const dynamic = "auto";
export const revalidate = 60;

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const [locale, CarouselSlides, saidItems, news] = await Promise.all([
    getLocale(),
    getCarousel(),
    getTestimonial(),
    getNews(),
  ]);
  const awaitedSearchParams = await searchParams;
  const query = awaitedSearchParams?.query || "";
  const currentPage = Number(awaitedSearchParams?.page) || 1;

  console.log("query:", query, "currentPage:", currentPage); // just for testing

  return (
    <>
      <Hero CarouselSlides={CarouselSlides} locale={locale} />
      <PageWrapper className="-translate-y-2 bg-white">
        <div
          className="pointer-events-none fixed -z-50 h-10 w-full bg-primary"
          aria-hidden
        />
        <About />
        <Goals />
        <Statics />
        <Programs />
        <News newsItems={news} locale={locale} />
        <Said saidItems={saidItems} />
      </PageWrapper>
    </>
  );
}
