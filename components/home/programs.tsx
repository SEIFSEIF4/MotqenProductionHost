import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { SectionWrapper } from "@/components/Wrapper";
import { SubTitle } from "@/components/ui/heading";
import { cn } from "@/lib/utils";
import ProgramImg1 from "@/images/program-1.png";
import ProgramImg2 from "@/images/program-2.png";
import ProgramImg3 from "@/images/program-3.png";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";

import { ProgramsTextType } from "@/data/programs";
import { PROGRAMS_FIXED_HEIGHT } from "@/constant/common";
const images = [ProgramImg1, ProgramImg2, ProgramImg3];

function Programs() {
  const t = useTranslations("HomePage.ProgramsSection");
  const programs: ProgramsTextType = t.raw("programs");

  return (
    <SectionWrapper id="programs" className="bg-[#F3F4F6]">
      <SubTitle text={t("title")} />
      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        {programs.map((item, index) => (
          <div
            key={index}
            style={{
              height: PROGRAMS_FIXED_HEIGHT,
            }}
            className={cn(
              "group relative overflow-hidden rounded-lg transition-all delay-200 duration-500 md:flex-1 md:hover:flex-[4]",
              "md:flex-1", // Default size
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
                "absolute bottom-0 z-0 w-full bg-primary bg-gradient-to-r from-[rgba(9,72,81,1)] to-[rgba(22,92,103,1)] transition-all delay-200 duration-500 group-hover:h-[30%]",
                "h-0",
              )}
              aria-hidden
            />
            <div
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-[rgba(22,22,22,0.9)] to-[rgba(0,12,13,0)] p-4 text-white",
                "opacity-100 transition-all delay-200 duration-500 group-hover:from-[rgba(0,12,13,0)] group-hover:to-[rgba(22,22,22,0.9)]",
              )}
            >
              <h2 className="absolute bottom-8 z-10 p-3 text-2xl font-bold opacity-100 group-hover:opacity-0">
                {item.title}
              </h2>
              <div
                className={cn(
                  "static right-0 top-0 flex flex-col justify-between p-10 transition-all delay-200 duration-500 group-hover:absolute group-hover:h-[70%]",
                  "h-0 opacity-0 transition-all duration-1000",
                  "group-hover:h-[70%] group-hover:animate-fadeIn group-hover:opacity-100",
                )}
              >
                <div>
                  {/* Programs Details */}
                  <h3 className="z-10 p-3 text-2xl font-bold opacity-0 group-hover:opacity-100">
                    {item.title}
                  </h3>
                  <div className="mt-4 text-center opacity-0 group-hover:opacity-100">
                    <p className="text-start text-xl">{item.details}</p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="mr-auto w-fit bg-white opacity-0 hover:bg-white/75 group-hover:opacity-100"
                >
                  <MoveRight /> {t("button")}
                </Button>
              </div>
              <div
                className={cn(
                  "z-10 flex w-full flex-row gap-4 overflow-hidden p-3",
                  "dduration-1000 h-0 opacity-0 transition-all",
                  "group-hover:h-[30%] group-hover:animate-fadeIn group-hover:opacity-100",
                  "animate-fadeOut",
                )}
              >
                {item.programs.map((program, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: `${100 / item.programs.length}%`, // Dynamically set width
                    }}
                    className="flex flex-col items-start gap-2 border-gray-300 pb-2 last:border-none"
                  >
                    <h4 className="text-xl font-bold">{program.title}</h4>
                    <ul className="flex w-full flex-col items-start gap-1 py-2">
                      {program.list.map((detail, detailIdx) => (
                        <li
                          key={detailIdx}
                          className="flex flex-row justify-start gap-4"
                        >
                          <span className="font-medium">{detail.label}:</span>
                          <span className="text-base text-white">
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
