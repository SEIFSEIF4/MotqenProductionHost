import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { SectionWrapper } from "@/components/Wrapper";
import { SubTitle } from "../ui/heading";

import Statics from "@/images/statics.png";
import Statics1 from "@/images/statics-1.png";
import Statics2 from "@/images/static-2.png";
import Statics3 from "@/images/static-3.png";

function Goals() {
  const t = useTranslations("HomePage.StaticsSection");

  return (
    <SectionWrapper id="goals" className="min-h-screen">
      <div className="relative">
        <Image
          alt="Statics"
          src={Statics}
          placeholder="blur"
          quality={100}
          sizes="100vw"
          className="absolute -z-10 max-h-[548px] rounded-lg"
          style={{
            objectFit: "cover",
          }}
        />
        {/* content */}
        <div className="flex h-96 flex-col items-start justify-center bg-red-200 px-6 md:px-horizontalSpace">
          <SubTitle text={t("title")} className="text-white" />
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="single flex aspect-square flex-col items-center justify-center">
              <Image src={Statics1} alt="Statics background" />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Goals;
