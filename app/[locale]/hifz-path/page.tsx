import React from "react";
import { useLocale } from "next-intl";

import PathwayCard from "@/components/programs/PathwayCard";
import { PageWrapper } from "@/components/Wrapper";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";

export default function HomePage() {
  const locale = useLocale();

  return (
    <PageWrapper className={`${locale === "ar" ? "h-[840px]" : "h-[880px]"}`}>
      <section
        id="hifz-path"
        className="w-full rounded-lg bg-[#F3F4F6] py-verticalSpace"
      >
        <div className="px-5 md:px-horizontalSpace lg:px-10">
          <DynamicBreadcrumb />
        </div>

        <PathwayCard order="third" />
      </section>
    </PageWrapper>
  );
}
