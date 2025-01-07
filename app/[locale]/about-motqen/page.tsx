import React from "react";
import { getTranslations } from "next-intl/server";

import { SectionWrapper } from "@/components/Wrapper";
import { SubTitle } from "@/components/ui/heading";
import { useTranslations } from "next-intl";
import AboutMotqen from "./_components/AboutMotqen";
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
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "AboutMotqen" });

  return constructMetadata({
    title: t("title"),
    description: t("about"),
  });
}

export default function HomePage() {
  const t = useTranslations("AboutMotqen");

  return (
    <SectionWrapper isSinglePage id="about" className="rounded-lg bg-[#F3F4F6]">
      <DynamicBreadcrumb />
      <SubTitle text={t("title")} />
      <AboutMotqen />
    </SectionWrapper>
  );
}
