import React from "react";

import PathwayCard from "@/components/programs/PathwayCard";
import { PageWrapper, SectionWrapper } from "@/components/Wrapper";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";

export default function HomePage() {
  return (
    <PageWrapper>
      <SectionWrapper id="about" className="rounded-lg bg-[#F3F4F6]">
        <DynamicBreadcrumb />

        <PathwayCard order="third" />
      </SectionWrapper>
    </PageWrapper>
  );
}
