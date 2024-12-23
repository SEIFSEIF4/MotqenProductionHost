import React from "react";
import { getTranslations } from "next-intl/server";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";
import { SectionWrapper } from "@/components/Wrapper";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import NewsDummyImg from "@/images/card-2.jpg";
import { Link } from "next-view-transitions";
import { CalendarRange, MoveRight, Link as LinkIcon } from "lucide-react";
import { getLocale } from "next-intl/server";
import { cn, convertToHijriDate } from "@/lib/utils";
import { FooterIcons } from "@/components/icons";
import { getSingleNews } from "@/sanity/lib/news/getSingleNews";
import { SingleNewsQueryResult, Slug } from "@/sanity.types";
import { CopyUrlButton } from "@/components/copyToClipboard";
import SubNews from "../_components/SubNews";
import BlockContentComponent from "../_components/renderBlockContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SingleNewsPage({ params }: PageProps) {
  const { id } = await params;
  const singleNews = (await getSingleNews(id)) as SingleNewsQueryResult;
  const t = await getTranslations("NewsPage");
  const tf = await getTranslations("Footer");
  const locale = await getLocale();

  return (
    <SectionWrapper id="singleNews" className="bg-[#F3F4F6]">
      <DynamicBreadcrumb isDynamicRoute="dynamicNews" />

      {/* News right */}
      <div className="flex flex-col gap-8 lg:flex-row">
        <Card className="relative flex w-full flex-col rounded-2xl bg-white p-3 shadow-md lg:w-2/3">
          {/* Image Section */}
          <div className="relative h-96 w-full shrink-0">
            <Image
              fill
              priority
              alt={"newsItem.title"}
              src={singleNews?.image?.asset?.url ?? NewsDummyImg}
              quality={100}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 30vw"
              className="rounded-xl object-cover"
            />
            {/* Bottom Overlay Card */}
            <div className="absolute -bottom-10 left-1/2 z-10 w-[75%] -translate-x-1/2 transform rounded-lg border bg-white px-8 py-4 shadow-lg md:w-[90%]">
              {/* Colored Vertical Line */}
              <div
                className="absolute -top-3 left-1/2 h-4 w-16 -translate-x-1/2 rotate-180 rounded-lg bg-secondary md:right-0 md:w-44 md:-translate-x-1/4"
                aria-hidden="true"
              />

              <CardTitle className="line-clamp-4 text-start text-lg leading-tight md:text-2xl md:font-bold">
                {singleNews?.title ?? "عنوان الخبر"}
              </CardTitle>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col justify-between px-4 pt-14">
            <CardHeader className="gap-y-1 space-y-2 p-0">
              <div className="mb-6 flex w-full items-center justify-between">
                <div className="flex items-center gap-x-2 text-[#384250]">
                  <CalendarRange />
                  <span>
                    {singleNews?._createdAt
                      ? convertToHijriDate(singleNews._createdAt)
                      : ""}
                  </span>
                </div>
                <div className="flex gap-x-2">
                  <CopyUrlButton />
                  {singleNews?.socialLinks?.instagram && (
                    <a
                      href={singleNews?.socialLinks?.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:opacity-75"
                    >
                      <FooterIcons.Instagram altColor="#384250" />
                    </a>
                  )}

                  {singleNews?.socialLinks?.twitter && (
                    <a
                      href={singleNews?.socialLinks?.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={tf("ariaLabels.twitter")}
                      className="cursor-pointer hover:opacity-75"
                    >
                      <FooterIcons.Twitter altColor="#384250" />
                    </a>
                  )}
                  {singleNews?.socialLinks?.linkedin && (
                    <a
                      href={singleNews?.socialLinks?.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={tf("ariaLabels.linkedIn")}
                      className="cursor-pointer hover:opacity-75"
                    >
                      <FooterIcons.LinkedIn altColor="#384250" />
                    </a>
                  )}
                  {singleNews?.socialLinks?.whatsapp && (
                    <a
                      href={singleNews?.socialLinks?.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={tf("ariaLabels.whatsApp")}
                      className="cursor-pointer hover:opacity-75"
                    >
                      <FooterIcons.WhatsApp altColor="#384250" />
                    </a>
                  )}
                </div>
              </div>
              <CardDescription className="text-right text-base font-medium leading-relaxed text-gray-600 md:text-xl">
                {singleNews?.content && (
                  <BlockContentComponent content={singleNews.content} />
                )}
              </CardDescription>
            </CardHeader>
          </div>
        </Card>
        {/* News left */}
        <SubNews slug={id} />
      </div>
      <Link
        href={`/${locale}/news`}
        className={cn(buttonVariants({ variant: "outline" }), "my-8")}
      >
        <MoveRight />
        الرجوع للخلف
      </Link>
    </SectionWrapper>
  );
}
