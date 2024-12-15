import React from "react";

import About from "@/components/home/about";
import Goals from "@/components/home/goals";
import Statics from "@/components/home/statics";
import Programs from "@/components/home/programs";
import Hero from "@/components/home/hero";
import News from "@/components/home/news";
import Said from "@/components/home/said";

import { PageWrapper } from "@/components/Wrapper";

export default function HomePage() {
  return (
    <PageWrapper className="">
      <Hero />
      <About />
      <Goals />
      <Statics />
      <Programs />
      <News />
      <Said />
    </PageWrapper>
  );
}
