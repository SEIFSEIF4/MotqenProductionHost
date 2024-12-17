// pages/[locale]/news.tsx
import React from "react";
import { getTranslations } from "next-intl/server";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";
import { SectionWrapper } from "@/components/Wrapper";
import { SubTitle } from "@/components/ui/heading";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import NewsDummyImg from "@/images/card-2.jpg";
import { Link } from "next-view-transitions";
import {
  Calendar,
  CalendarRange,
  MoveRight,
  Link as LinkIcon,
} from "lucide-react";
import { getLocale } from "next-intl/server";
import { cn, copyToClipboard } from "@/lib/utils";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { FooterIcons } from "@/components/icons";
import SubNews from "../_components/SubNews";

const color = "#384250";

export default async function SingleNewsPage() {
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
              src={NewsDummyImg}
              alt={"newsItem.title"}
              fill
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

              <CardTitle className="text-start text-lg leading-tight md:text-2xl md:font-bold">
                جمعية متقن تطلق مبادرة لتحفيظ القرآن الكريم باستخدام التقنية
                الحديثة والذكاء الاصطناعي
              </CardTitle>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col justify-between px-4 pt-14">
            <CardHeader className="gap-y-1 space-y-2 p-0">
              <div className="mb-6 flex w-full items-center justify-between">
                <div className="flex items-center gap-x-2 text-[#384250]">
                  <CalendarRange />
                  <span> 01 ربيع الآخر 1445 هـ</span>
                </div>
                <div className="flex gap-x-2">
                  <LinkIcon
                    className="text-[#384250]"
                    aria-label={tf("ariaLabels.instagram")}
                    // onClick={() => copyToClipboard("URl")}
                  />
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer hover:opacity-75"
                  >
                    <FooterIcons.Instagram altColor="#384250" />
                  </a>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={tf("ariaLabels.twitter")}
                    className="cursor-pointer hover:opacity-75"
                  >
                    <FooterIcons.Twitter altColor="#384250" />
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={tf("ariaLabels.linkedIn")}
                    className="cursor-pointer hover:opacity-75"
                  >
                    <FooterIcons.LinkedIn altColor="#384250" />
                  </a>
                  <a
                    href="https://www.whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={tf("ariaLabels.whatsApp")}
                    className="cursor-pointer hover:opacity-75"
                  >
                    <FooterIcons.WhatsApp altColor="#384250" />
                  </a>
                </div>
              </div>
              <CardDescription className="text-right text-base font-medium leading-relaxed text-gray-600 md:text-xl">
                أعلنت جمعية متقن لتعليم القرآن الكريم عن إطلاق مبادرة نوعية تهدف
                إلى تسهيل تعليم وتحفيظ القرآن الكريم باستخدام التقنيات الحديثة.
                <div className="h-4" />
                وتشمل المبادرة منصة تعليمية إلكترونية تتيح للطلاب والطالبات
                الوصول إلى دروس تفاعلية وبرامج متخصصة في علوم القرآن.
                <div className="h-4" />
                وتأتي هذه الخطوة في إطار حرص الجمعية على مواكبة التطورات التقنية
                وتوفير بيئة تعليمية محفزة تعزز من فهم كتاب الله وحفظه. وتهدف
                الجمعية من خلال هذه المبادرة إلى توسيع نطاق خدماتها والوصول إلى
                أكبر عدد من المستفيدين داخل المملكة وخارجها.
                <div className="h-4" />
                وأكد رئيس مجلس إدارة جمعية متقن، أن المبادرة تأتي ضمن رؤية
                الجمعية لتحقيق تعليم نوعي شامل يربط الأجيال بكتاب الله بطريقة
                ميسرة ومبتكرة.
              </CardDescription>
            </CardHeader>
          </div>
        </Card>
        {/* News left */}
        <div className="flex w-full flex-col gap-y-4 lg:w-1/3">
          <SubTitle text={t("SingleNews")} />
          <SubNews
            ImgSrc={NewsDummyImg}
            imgAlt={`newsItem.alt`}
            title={`عنوان بطاقة الأخبار في سطرين` /* `newsItem.title` */}
            description={
              `هنا يمكنك تضمين وصف موجز للعنوان في أربعة أسطر. هنا يمكنك تضمين وصف موجز للعنوان في أربعة أسطر.` /* `newsItem.description` */
            }
            href={`/` /* `/${locale}/news/${newsItem.id}` */}
            buttonTitle={t("button2")}
          />
          <SubNews
            ImgSrc={NewsDummyImg}
            imgAlt={`newsItem.alt`}
            title={`عنوان بطاقة الأخبار في سطرين` /* `newsItem.title` */}
            description={
              `هنا يمكنك تضمين وصف موجز للعنوان في أربعة أسطر. هنا يمكنك تضمين وصف موجز للعنوان في أربعة أسطر.` /* `newsItem.description` */
            }
            href={`/` /* `/${locale}/news/${newsItem.id}` */}
            buttonTitle={t("button2")}
          />
        </div>
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
