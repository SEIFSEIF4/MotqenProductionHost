import React from "react";

import { PageWrapper, SectionWrapper } from "@/components/Wrapper";
import { SubTitle } from "@/components/ui/heading";
import { useTranslations } from "next-intl";
import AboutMotqen from "@/components/about/AboutMotqen";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";

export default function HomePage() {
  const t = useTranslations("AboutMotqen");

  return (
    <PageWrapper>
      <SectionWrapper id="about" className="rounded-lg bg-[#F3F4F6]">
        <DynamicBreadcrumb />
        <SubTitle text={t("title")} />
        <AboutMotqen />
      </SectionWrapper>
    </PageWrapper>
  );
}
