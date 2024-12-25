import React from "react";
import { getTranslations, getLocale } from "next-intl/server";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";
import { SectionWrapper } from "@/components/Wrapper";
import { SubTitle } from "@/components/ui/heading";
import { getNews } from "@/sanity/lib/news/getNews";
import NewsInfiniteList from "./_components/NewsInfiniteList";

export default async function NewsPage() {
  const PAGE_SIZE = 6;

  const t = await getTranslations("NewsPage");
  const initialNews = await getNews(PAGE_SIZE);
  const locale = await getLocale();

  console.log("MainPage", initialNews, "locale", locale); // Debugging

  return (
    <SectionWrapper id="news" className="bg-[#F3F4F6]">
      <DynamicBreadcrumb />
      <SubTitle text={t("title")} />
      <p className="mt-4">{t("description")}</p>
      <NewsInfiniteList
        initialData={initialNews}
        locale={locale}
        buttonText={t("button2")}
        PAGE_SIZE={PAGE_SIZE}
      />
    </SectionWrapper>
  );
}
