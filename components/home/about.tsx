import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { SectionWrapper } from "@/components/Wrapper";
import { SubTitle } from "@/components/ui/heading";

import Vision from "@/images/about-1.png";
import Values from "@/images/about-3.jpg";
import Mission from "@/images/about-2.png";
import AboutCarousel from "@/components/icons/AboutCarousel";

function About() {
  const t = useTranslations("HomePage.AboutSection");

  return (
    <SectionWrapper id="about" className="rounded-t-[48px] bg-white">
      <SubTitle text={t("title")} />
      <p className="my-8 font-medium">{t("about")}</p>
      <div className="grid grid-cols-1 gap-3 rounded-lg py-5 md:grid-cols-10 md:py-16">
        <div className="group relative col-span-7 h-[186px] rounded-2xl p-6 text-white backdrop-blur-xl duration-300 hover:rounded-3xl">
          <div
            className="absolute inset-0 z-10 rounded-2xl bg-gradient-to-r from-[rgba(0,14,16,0.8)] to-[rgba(22,92,103,0.8)] duration-300 group-hover:rounded-3xl"
            aria-hidden="true"
          />
          <div className="relative z-10 flex h-full flex-col justify-around">
            <h2 className="mb-4 text-2xl font-bold">{t("vision.title")}</h2>
            <p className="text-lg font-light md:w-2/3">
              {t("vision.description")}
            </p>
          </div>
          <Image
            placeholder="blur"
            quality={60}
            src={Vision}
            alt="About Vision"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-2xl"
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 75vw, 50vw"
          />
        </div>

        <div className="group relative col-span-7 row-span-2 h-full rounded-2xl p-6 text-white backdrop-blur-xl duration-300 hover:rounded-3xl md:col-span-3">
          <div
            className={`absolute inset-0 z-10 rounded-2xl from-[rgba(36,36,36,0.8)] to-[rgba(130,128,70,0.35)] duration-300 group-hover:rounded-3xl ltr:bg-gradient-to-l rtl:bg-gradient-to-r`}
            aria-hidden="true"
          />
          <div className="absolute top-0 z-10 max-w-[50%] md:max-w-full ltr:right-0 ltr:-scale-x-100 rtl:left-0">
            <AboutCarousel />
          </div>
          <div className="flex h-full w-full flex-col items-start justify-center gap-3 text-white">
            <h2 className="z-20 mb-4 text-2xl font-bold">
              {t("values.title")}
            </h2>
            <ul className="z-20 space-y-2 text-lg font-light">
              <li>{t("values.value1")}</li>
              <li>{t("values.value2")}</li>
              <li>{t("values.value3")}</li>
              <li>{t("values.value4")}</li>
            </ul>
          </div>
          <Image
            placeholder="blur"
            quality={75}
            src={Values}
            alt="About Values"
            fill
            className="rounded-2xl"
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 75vw, 50vw"
            style={{ objectFit: "cover", objectPosition: "left" }}
          />
        </div>

        <div className="group relative col-span-7 h-[186px] rounded-2xl p-6 text-white backdrop-blur-xl duration-300 hover:rounded-3xl">
          <div
            className="absolute inset-0 z-10 rounded-2xl bg-gradient-to-r from-[rgba(0,0,0,0.8)] to-[rgba(36,36,36,0.8)] duration-300 group-hover:rounded-3xl"
            aria-hidden="true"
          />
          <div className="relative z-10 flex h-full flex-col justify-around">
            <h2 className="mb-4 text-2xl font-bold">{t("mission.title")}</h2>
            <p className="text-lg font-light md:w-3/4">
              {t("mission.description")}
            </p>
          </div>
          <Image
            placeholder="blur"
            quality={10}
            src={Mission}
            alt="About Mission"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-2xl"
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 75vw, 50vw"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}

export default About;
