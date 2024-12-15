// pages/[locale]/news.tsx
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";
import { BodyClassWrapper, SectionWrapper } from "@/components/Wrapper";
import { SubTitle } from "@/components/ui/heading";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import NewsDummyImg from "@/images/card-2.jpg";
import { NewsDummyData } from "@/data/news";
import Link from "next/link";

type NewsItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default function NewsPage({}) {
  const t = useTranslations("NewsPage");

  const locale: string = useLocale();

  const newsItems: NewsItem[] =
    NewsDummyData[locale as "en" | "ar"] ?? NewsDummyData.ar;

  return (
    <BodyClassWrapper className="bg-[#F3F4F6]">
      <SectionWrapper id="news" className="bg-[#F3F4F6]">
        <DynamicBreadcrumb />
        <SubTitle text={t("title")} />
        <p className="mt-4">{t("description")}</p>
        {/* News Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {newsItems.map((newsItem) => (
            <Card
              key={newsItem.id}
              className="flex h-[500px] max-h-[500px] flex-col rounded-2xl bg-white p-3 shadow-md"
            >
              <div className="relative h-1/2 w-full">
                <Image
                  src={NewsDummyImg}
                  alt={newsItem.title}
                  fill
                  quality={100}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 30vw"
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between px-4">
                <CardHeader className="gap-y-1 space-y-2 p-4">
                  <CardTitle className="line-clamp-2 text-lg font-medium">
                    {newsItem.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-4 text-sm text-gray-600">
                    {newsItem.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link
                    href={`/${locale}/news/${newsItem.id}`}
                    className="w-full"
                  >
                    <Button className="w-full hover:opacity-75">
                      {t("button2")}
                    </Button>
                  </Link>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </BodyClassWrapper>
  );
}
