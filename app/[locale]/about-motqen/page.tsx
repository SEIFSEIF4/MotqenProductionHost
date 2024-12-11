import React from "react";

import { PageWrapper, SectionWrapper } from "@/components/Wrapper";
import { SubTitle } from "@/components/ui/heading";
import { useTranslations } from "next-intl";
import AboutMotqen from "@/components/about/AboutMotqen";

export default function HomePage() {
  const t = useTranslations("AboutMotqen");

  return (
    <SectionWrapper id="about" className="rounded-lg bg-[#F3F4F6]">
      <SubTitle text={t("title")} />

      <AboutMotqen />
    </SectionWrapper>
  );
}
