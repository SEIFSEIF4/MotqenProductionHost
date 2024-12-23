import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

// component
import { SectionWrapper } from "@/components/Wrapper";
import { SubTitle } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//data
import { Link } from "next-view-transitions";
import { News as NewsType } from "@/sanity.types";
import newsImage from "@/images/card-2.jpg";

export default async function News({
  newsItems,
  locale,
}: {
  newsItems: NewsType[];
  locale: string;
}) {
  //lang
  const t = await getTranslations("HomePage.NewsSection");

  console.log(newsItems);

  return (
    <SectionWrapper id="news" className="bg-white">
      {/* Section Header */}
      <div className="flex w-full items-center justify-between">
        <SubTitle text={t("title")} />
        <Link href={`/${locale}/news`}>
          <Button variant="outline" className="hover:opacity-75">
            {t("button")}
          </Button>
        </Link>
      </div>

      {/* News Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {newsItems.map((newsItem) => (
          <Card
            key={newsItem._id}
            className="flex h-[500px] max-h-[500px] flex-col rounded-2xl bg-white p-3 shadow-md"
          >
            <div className="relative h-1/2 w-full">
              <Image
                //@ts-expect-error 'url not found'
                src={newsItem.image?.asset?.url ?? newsImage}
                alt={newsItem.title || "News article"}
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
                  {newsItem.shortDescription}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Link
                  href={`/${locale}/news/${newsItem.slug}`}
                  className="w-fit"
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
  );
}
