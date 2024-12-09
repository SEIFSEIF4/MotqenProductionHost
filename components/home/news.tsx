import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { GetStaticProps } from "next";
import { Locale, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

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
import { DirectionProvider } from "@radix-ui/react-direction";

//data
import { NewsDummyData } from "@/data/news";
import NewsDummyImg from "@/images/card-2.jpg";

type NewsItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   const res = await fetch(`https://api.example.com/news?locale=${locale}`, {
//     next: { revalidate: 60 }, // Revalidate every 60 seconds
//   });

//   if (!res.ok) {
//     return { notFound: true }; // Handle API failure gracefully
//   }

//   const newsItems: NewsItem[] = await res.json();

//   return {
//     props: {
//       newsItems,
//       messages: (await import(`@/messages/${locale}.json`)).default, // next-intl translations
//     },
//   };
// };

async function getData(locale: string): Promise<NewsItem[]> {
  // Dummy data to simulate API response
  const dummyData = NewsDummyData;

  // Simulate API fetch with ISR
  //@ts-expect-error test temp data
  return dummyData[locale] ?? dummyData.ar;
}

export default async function News() {
  //lang
  const t = await getTranslations("HomePage.NewsSection");

  // const { locale } = await params;
  // if (!routing.locales.includes(locale as Locale)) {
  //   notFound();
  // }

  // const isArabic = locale === "ar";

  // //data
  const locale = "ar";
  const newsItems = await getData(locale);

  return (
    <SectionWrapper id="news">
      {/* Section Header */}
      <div className="flex w-full items-center justify-between">
        <SubTitle text={t("title")} />
        <Button variant="outline" className="hover:opacity-75">
          {t("button")}
        </Button>
      </div>

      {/* News Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {newsItems.map((newsItem) => (
          <Card
            key={newsItem.id}
            className="flex h-[500px] max-h-[500px] flex-col rounded-2xl bg-white p-3 shadow-md"
          >
            <div className="relative h-1/2 w-full">
              <Image
                src={NewsDummyImg} // Dummy image for now
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
                <Button className="w-full hover:opacity-75">
                  {t("button2")}
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
