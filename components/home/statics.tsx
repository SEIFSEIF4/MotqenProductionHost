import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { SectionWrapper } from "@/components/Wrapper";
import { SubTitle } from "../ui/heading";

import Count from "@/components/count";
import { STATICS_FIXED_HEIGHT } from "@/constant/common";

import StaticsBg from "@/images/statics.png";
import Statics1 from "@/images/statics-1.png";
import Statics2 from "@/images/static-2.png";
import Statics3 from "@/images/static-3.png";

const staticsData = [
  {
    imgSrc: Statics1,
    count: 1600,
    titleKey: "statics1.title",
    descriptionKey: "statics1.description",
  },
  {
    imgSrc: Statics2,
    count: 60,
    titleKey: "statics2.title",
    descriptionKey: "statics2.description",
  },
  {
    imgSrc: Statics3,
    count: 50,
    titleKey: "statics3.title",
    descriptionKey: "statics3.description",
  },
] as const;

function Statics() {
  const t = useTranslations("HomePage.StaticsSection");

  return (
    <SectionWrapper
      id="goals"
      className="relative flex items-center justify-center"
      style={{
        minHeight: STATICS_FIXED_HEIGHT,
      }}
    >
      <Image
        alt="Statics background"
        src={StaticsBg}
        placeholder="blur"
        quality={100}
        sizes="100vw"
        className="absolute left-0 top-0 -z-10 h-[-webkit-fill-available] w-full rounded-lg md:h-[548px]"
        style={{
          objectFit: "cover",
          height: "fill-available",
        }}
      />

      <div
        className="to-[rgba(21, 21, 21, 0.5)] absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-[rgba(0,14,16,0.8)] duration-300 group-hover:rounded-3xl"
        aria-hidden
      />

      <div className="flex h-full w-full flex-col items-start justify-center space-y-8 text-center">
        <SubTitle
          text={t("title")}
          className="text-2xl font-bold text-white md:text-4xl"
        />

        <div className="grid min-w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {staticsData.map((item, index) => (
            <div
              key={index}
              className="single flex flex-col items-center justify-center gap-x-6 gap-y-4 rounded-lg bg-[rgba(255,255,255,0.1)] p-6 shadow-lg backdrop-blur-xl"
            >
              <Image
                src={item.imgSrc}
                alt={`Statics background ${index + 1}`}
                className="h-14 w-auto"
              />
              <Count
                number={item.count}
                className="text-4xl font-bold text-[#6FA0A7]"
              />
              <h2 className="text-xl font-semibold text-white">
                {t(item.titleKey)}
              </h2>
              <p className="text-sm text-white">{t(item.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Statics;
