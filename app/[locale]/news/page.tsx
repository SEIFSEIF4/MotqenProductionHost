import React from "react";
import { getTranslations, getLocale } from "next-intl/server";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";
import { SectionWrapper } from "@/components/Wrapper";
import { SubTitle } from "@/components/ui/heading";
import { getNews } from "@/sanity/lib/news/getNews";
import NewsInfiniteList from "./_components/NewsInfiniteList";

export default async function NewsPage() {
  const t = await getTranslations("NewsPage");
  const initialNews = await getNews(6);
  const locale = await getLocale();

  return (
    <SectionWrapper id="news" className="bg-[#F3F4F6]">
      <DynamicBreadcrumb />
      <SubTitle text={t("title")} />
      <p className="mt-4">{t("description")}</p>
      <NewsInfiniteList
        initialData={initialNews}
        locale={locale}
        buttonText={t("button2")}
      />
    </SectionWrapper>
  );
}
