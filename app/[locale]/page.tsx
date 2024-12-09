import React from "react";

import About from "@/components/home/about";
import Goals from "@/components/home/goals";
import Statics from "@/components/home/statics";
import News from "@/components/home/news";

import { PageWrapper } from "@/components/Wrapper";

export default function HomePage() {
  return (
    <PageWrapper className="">
      <section id="hero" className="min-h-96"></section>
      <About />
      <Goals />
      <Statics />
      <News />
      <section id="hero" className="min-h-96"></section>
    </PageWrapper>
  );
}
