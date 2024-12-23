import React from "react";
import { getLocale, getTranslations } from "next-intl/server";

import { SubTitle } from "@/components/ui/heading";
import NewsDummyImg from "@/images/card-2.jpg";
import SubNewsCard from "./SubNewsCard";
import { getNews } from "@/sanity/lib/news/getNews";

export default async function SubNews({ slug }: { slug: string }) {
  const locale = await getLocale();
  const t = await getTranslations("NewsPage");
  const News = await getNews(2, slug);

  return (
    <div className="flex w-full flex-col gap-y-4 lg:w-1/3">
      <SubTitle text={t("SingleNews")} />
      {News.map((newsItem) => (
        <SubNewsCard
          key={newsItem._id}
          ImgSrc={newsItem.imageUrl ?? NewsDummyImg}
          imgAlt={newsItem.title ?? ""}
          title={newsItem.title ?? ""}
          description={newsItem.shortDescription ?? ""}
          href={`/${locale}/news/${newsItem.slug}`}
          buttonTitle={t("button2")}
        />
      ))}
    </div>
  );
}
