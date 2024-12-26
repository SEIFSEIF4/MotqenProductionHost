import React from "react";
import { getTranslations, getLocale } from "next-intl/server";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";
import { SubTitle } from "@/components/ui/heading";
import { getNews } from "@/sanity/lib/news/getNews";
import NewsInfiniteList from "./_components/NewsInfiniteList";
import { PAGE_SIZE } from "@/constant/common";

export const revalidate = 180; // Regenerate the page every 3-minutes

export default async function NewsPage() {
  const t = await getTranslations("NewsPage");
  const initialNews = await getNews(PAGE_SIZE);
  const locale = await getLocale();
  const NoMoreNews = t("noMoreNews");

  return (
    <section
      id="news"
      className="min-h-[inherit] w-full bg-[#F3F4F6] px-10 py-verticalSpace md:px-horizontalSpace"
    >
      <DynamicBreadcrumb />
      <SubTitle text={t("title")} />
      <p className="mt-4">{t("description")}</p>
      <NewsInfiniteList
        initialData={initialNews}
        locale={locale}
        buttonText={t("button2")}
        PAGE_SIZE={PAGE_SIZE}
        NoMoreNews={NoMoreNews}
      />
    </section>
  );
}
