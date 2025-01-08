import React from "react";

import {
  About,
  Goals,
  Statics,
  Programs,
  Hero,
  News,
  Said,
} from "@/components/home";

import { PageWrapper } from "@/components/Wrapper";
import { getCarousel } from "@/sanity/lib/news/getCarousel";
import { getTestimonial } from "@/sanity/lib/news/getTestimonial";
import { getNews } from "@/sanity/lib/news/getNews";
import { constructMetadata } from "@/lib/utils";

export const revalidate = 1800; // invalidate every 30m

// Generate static paths for each locale
export async function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

// Generate static metadata for each locale
export async function generateMetadata() {
  return constructMetadata();
}

export default async function HomePage({
  searchParams,
  params,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
  params: Promise<{ locale: string }>;
}) {
  const [{ locale }, initialCarousel, initialSaidItems, news] =
    await Promise.all([params, getCarousel(), getTestimonial(), getNews()]);

  return (
    <>
      <Hero locale={locale} initialCarousel={initialCarousel} />
      <PageWrapper className="relative z-50 -mb-[30px] -translate-y-10 rounded-t-[48px] bg-white md:-mb-[38px]">
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
