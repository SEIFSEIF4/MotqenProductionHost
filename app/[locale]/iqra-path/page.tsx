import React from "react";

import PathwayCard from "@/components/programs/PathwayCard";
import { PageWrapper, SectionWrapper } from "@/components/Wrapper";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";

export default function HomePage() {
  return (
    <PageWrapper>
      <section
        id="iqra-path"
        className="w-full rounded-lg bg-[#F3F4F6] py-verticalSpace"
      >
        <div className="px-5 md:px-horizontalSpace lg:px-10">
          <DynamicBreadcrumb />
        </div>

        <PathwayCard order="first" />
      </section>
    </PageWrapper>
  );
}
