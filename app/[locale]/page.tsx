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
    <>
      <Hero />
      <PageWrapper className="-translate-y-2">
        <div
          className="pointer-events-none fixed -z-50 h-10 w-full bg-primary"
          aria-hidden
        />
        <About />
        <Goals />
        <Statics />
        <Programs />
        <News />
        <Said />
      </PageWrapper>
    </>
  );
}
