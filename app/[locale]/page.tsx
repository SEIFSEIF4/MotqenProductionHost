import React from "react";

import About from "@/components/home/about";
import Goals from "@/components/home/goals";
import Statics from "@/components/home/statics";

import { PageWrapper } from "@/components/Wrapper";

export default function HomePage() {
  return (
    <PageWrapper className="">
      <section id="hero" className="min-h-96"></section>
      <About />
      <Goals />
      <Statics />
      <section id="hero" className="min-h-96"></section>
    </PageWrapper>
  );
}
