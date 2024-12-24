import React from "react";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import PathwayCard from "@/components/programs/PathwayCard";
import { PageWrapper } from "@/components/Wrapper";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";
import { constructMetadata } from "@/lib/utils";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;

  const t = await getTranslations({ locale, namespace: "Programs.second" });

  return constructMetadata({
    title: t("title"),
    description: t("description"),
  });
}

export default function HomePage() {
  const locale = useLocale();

  return (
    <PageWrapper
      className={`${locale === "ar" ? "h-[840px] md:h-[540px]" : "h-[900px] md:h-[600px]"}`}
    >
      <section
        id="ittqan-path"
        className="w-full rounded-lg bg-[#F3F4F6] py-verticalSpace"
      >
        <div className="px-5 md:px-horizontalSpace lg:px-10">
          <DynamicBreadcrumb />
        </div>

        <PathwayCard order="second" />
      </section>
    </PageWrapper>
  );
}
