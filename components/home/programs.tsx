import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { SectionWrapper } from "@/components/Wrapper";
import { SubTitle } from "@/components/ui/heading";
import { cn } from "@/lib/utils";
import ProgramImg1 from "@/images/program-1.png";
import ProgramImg2 from "@/images/program-2.png";
import ProgramImg3 from "@/images/program-3.png";
import { Button } from "../ui/button";
import { MoveLeft, MoveRight } from "lucide-react";

import { ProgramsTextType } from "./programs-text";
import { PROGRAMS_FIXED_HEIGHT } from "@/constant/common";
import { Link } from "next-view-transitions";
const images = [ProgramImg1, ProgramImg2, ProgramImg3];

function Programs() {
  const t = useTranslations("HomePage.ProgramsSection");
  const programs: ProgramsTextType = t.raw("programs");
  const locale = useLocale();

  return (
    <SectionWrapper id="programs" className="bg-[rgba(243,244,246,1)]">
      <SubTitle text={t("title")} />
      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        {programs.map((item, index) => (
          <div
            key={index}
            style={{
              height: PROGRAMS_FIXED_HEIGHT,
            }}
            className={cn(
              `group relative overflow-hidden rounded-lg transition-all delay-200 duration-500 md:flex-1 md:hover:flex-[4]`,
              "md:flex-1", // Default size
              index === 0
                ? `${locale === "ar" ? "hover:!h-[840px]" : "hover:!h-[920px]"}`
                : `${locale === "ar" ? "hover:!h-[570px]" : "hover:!h-[655px]"}`,
              PROGRAMS_FIXED_HEIGHT === 486 && `md:hover:!h-[486px]`,
            )}
          >
            <Image
              src={images[index] || ProgramImg3}
              alt={item.title}
              placeholder="blur"
              className="h-full w-full rounded-lg object-cover transition-transform duration-500"
            />
            <div
              className={cn(
                "absolute bottom-0 z-0 w-full bg-primary bg-gradient-to-r from-[rgba(9,72,81,1)] to-[rgba(22,92,103,1)] transition-all delay-200 duration-500 md:group-hover:h-[30%]",
                "h-0",
                index === 0
                  ? `${locale === "ar" ? "group-hover:h-[65%]" : "group-hover:h-[58%]"}`
                  : `${locale === "ar" ? "group-hover:h-[50%]" : "group-hover:h-[41%]"}`,
              )}
              aria-hidden
            />
            <div
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-[rgba(22,22,22,0.9)] to-[rgba(0,12,13,0)] text-white",
                "opacity-100 transition-all delay-200 duration-500 group-hover:from-[rgba(0,12,13,0)] group-hover:to-[rgba(22,22,22,0.9)]",
              )}
            >
              <h2 className="absolute bottom-8 z-10 p-3 text-2xl font-bold opacity-100 group-hover:opacity-0">
                {item.title}
              </h2>
              <div
                className={cn(
                  "static right-0 top-0 flex flex-col justify-between gap-4 p-10 transition-all delay-200 duration-500 group-hover:absolute md:group-hover:h-[70%] lg:gap-0",
                  "opacity-0 transition-all duration-1000",
                  "group-hover:animate-fadeIn group-hover:opacity-100",
                  index === 0
                    ? `${locale === "ar" ? "group-hover:h-[35%]" : "group-hover:h-[42%]"}`
                    : `${locale === "ar" ? "group-hover:h-[50%]" : "group-hover:h-[59%]"}`,
                )}
              >
                <div>
                  {/* Programs Details */}
                  <h3 className="z-10 p-3 text-2xl font-bold opacity-0 group-hover:opacity-100 lg:text-3xl">
                    {item.title}
                  </h3>
                  <div className="mt-4 text-center opacity-0 group-hover:opacity-100">
                    <p
                      className={`text-start ${locale === "ar" ? "text-lg lg:text-2xl" : "text-lg lg:text-xl"}`}
                    >
                      {item.details}
                    </p>
                  </div>
                </div>
                {item.id === 1 ? (
                  <Link href={`/${locale}/hifz-path`} className="self-end">
                    <Button
                      variant="secondary"
                      className="mr-auto w-fit bg-white opacity-0 hover:bg-white/75 group-hover:opacity-100"
                    >
                      {locale === "ar" ? <MoveRight /> : <MoveLeft />}{" "}
                      {t("button")}
                    </Button>
                  </Link>
                ) : item.id === 2 ? (
                  <Link href={`/${locale}/ittqan-path`} className="self-end">
                    <Button
                      variant="secondary"
                      className="mr-auto w-fit bg-white opacity-0 hover:bg-white/75 group-hover:opacity-100"
                    >
                      {locale === "ar" ? <MoveRight /> : <MoveLeft />}{" "}
                      {t("button")}
                    </Button>
                  </Link>
                ) : item.id === 3 ? (
                  <Link href={`/${locale}/iqra-path`} className="self-end">
                    <Button
                      variant="secondary"
                      className="mr-auto w-fit bg-white opacity-0 hover:bg-white/75 group-hover:opacity-100"
                    >
                      {locale === "ar" ? <MoveRight /> : <MoveLeft />}{" "}
                      {t("button")}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="secondary"
                    className="mr-auto w-fit self-end bg-white opacity-0 hover:bg-white/75 group-hover:opacity-100"
                  >
                    {locale === "ar" ? <MoveRight /> : <MoveLeft />}{" "}
                    {t("button")}
                  </Button>
                )}
              </div>
              <div
                className={cn(
                  "z-10 flex w-full flex-col gap-4 overflow-hidden p-3 md:flex-row",
                  "h-0 opacity-0 transition-all duration-1000",
                  "group-hover:animate-fadeIn group-hover:opacity-100 md:group-hover:h-[30%]",
                  "animate-fadeOut",
                  index === 0
                    ? `${locale === "ar" ? "group-hover:h-[65%]" : "group-hover:h-[58%]"}`
                    : `${locale === "ar" ? "group-hover:h-[50%]" : "group-hover:h-[41%]"}`,
                )}
              >
                {item.programs.map((program, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: `${100 / item.programs.length}%`, // Dynamically set width
                    }}
                    className={`flex flex-col items-start justify-evenly gap-2 border-gray-300 p-2 last:border-none ${idx !== 0 && `relative before:absolute ${locale === "ar" ? "before:right-0 md:before:-right-1" : "before:left-0 md:before:-left-1"} before:-top-2 before:h-[1px] before:w-80 before:bg-white before:opacity-70 md:before:top-2 md:before:h-4/5 md:before:w-[1px]`}`}
                  >
                    <h4
                      className={`${locale === "ar" ? "text-lg lg:text-xl" : "text-base lg:text-lg"} font-semibold`}
                    >
                      {program.title}
                    </h4>
                    <ul className="flex w-full flex-col items-start justify-start gap-8 md:flex-row">
                      {program.list.map((detail, detailIdx, programArr) => (
                        <li
                          key={detailIdx}
                          className={`relative flex w-full flex-col justify-start rounded after:absolute after:-bottom-2 after:h-[1px] after:w-80 after:bg-[#FFFFFF33] md:after:hidden ${detailIdx === programArr.length - 1 && "after:hidden"}`}
                        >
                          <span className="font-normal">{detail.label}</span>
                          <span
                            className={`${locale === "ar" ? "font-bold" : "font-semibold"} text-sm text-white ${detailIdx !== 0 && `relative before:absolute before:hidden before:md:inline-block ${locale === "ar" ? "before:-right-[18px]" : "before:-left-[18px]"} before:top-1/2 before:h-[5px] before:w-[5px] before:-translate-y-1/2 before:rounded-full before:bg-white`}`}
                          >
                            {detail.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default Programs;
