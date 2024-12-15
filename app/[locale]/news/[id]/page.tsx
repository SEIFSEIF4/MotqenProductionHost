// pages/[locale]/news.tsx
import React from "react";
import { useTranslations } from "next-intl";
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

type NewsItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default function SingleNewsPage({}) {
  const t = useTranslations("NewsPage");

  return (
    <BodyClassWrapper className="bg-[#F3F4F6]">
      <SectionWrapper id="news" className="bg-[#F3F4F6]">
        <DynamicBreadcrumb isDynamicRoute="dynamicNews" />

        {/* News Cards */}
        <Card className="flex h-[500px] max-h-[500px] flex-col rounded-2xl bg-white p-3 shadow-md">
          <div className="relative h-1/2 w-full">
            <Image
              src={NewsDummyImg}
              alt={"newsItem.title"}
              fill
              quality={100}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 30vw"
              className="rounded-xl object-cover"
            />
            <div className="absolute -bottom-10 left-1/2 mx-auto h-fit w-[75%] -translate-x-1/2 transform rounded-lg border bg-white px-8 py-3">
              {/* <span
              className="block h-9 w-2 rounded-lg bg-secondary"
              aria-hidden="true"
            /> */}
              <h1 className="text-center text-xl font-bold">
                جمعية متقن تطلق مبادرة لتحفيظ القرآن الكريم باستخدام التقنية
                الحديثة
              </h1>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between px-4">
            <CardHeader className="gap-y-1 space-y-2 p-4">
              <CardTitle className="line-clamp-2 text-lg font-medium">
                newsItem.title
              </CardTitle>
              <CardDescription className="line-clamp-4 text-sm text-gray-600">
                newsItem.description
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full hover:opacity-75">
                {t("button2")}
              </Button>
            </CardFooter>
          </div>
        </Card>
      </SectionWrapper>
    </BodyClassWrapper>
  );
}
