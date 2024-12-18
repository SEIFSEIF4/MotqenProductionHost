import React from "react";
import { useTranslations } from "next-intl";

import PathwayHeader from "./PathwayHeader";
import PathwayTypes from "./PathwayTypes";
import InfoCard from "./InfoCard";
import PathwayButtons from "./PathwayButtons";

import RamadhanMonth from "../icons/RamadhanMonth";
import QuranFill from "../icons/QuranFill";
import GraduationScroll from "../icons/GraduationScroll";
import Tasbih from "../icons/Tasbih";

const PathwayCard = ({ order }: { order: string }) => {
  const t = useTranslations(`Programs.${order}`);
  const subtitle: string[] = t.raw("subtitle");

  const iconMap: Record<string, any> = {
    duration: RamadhanMonth,
    howMuch: QuranFill,
    days: order === "first" ? GraduationScroll : Tasbih,
  };

  return (
    <div className="mx-auto py-4">
      <div className="relative mb-[27rem] bg-[#155C67] p-6 pb-12 text-white md:mb-0">
        <PathwayHeader title={t("title")} />

        {subtitle.map((label: string, idx: number) => (
          <p
            key={label + idx}
            className="m-2 inline-block rounded-lg border px-3 py-2 text-sm font-medium"
          >
            {label}
          </p>
        ))}

        <div className="absolute left-1/2 top-[90%] w-5/6 -translate-x-1/2 rounded-xl bg-white text-gray-900 shadow-md lg:rounded-lg">
          {order === "third" && <PathwayTypes t={t} />}

          <div className="p-4">
            <p className="mb-6 text-base font-medium leading-6 lg:text-lg">
              {t("description")}
            </p>
            <div className="flex flex-col justify-start gap-y-6 p-2 text-lg md:flex-row md:gap-x-12 lg:gap-x-52">
              {Object.entries(iconMap).map(([key, Icon], idx) => (
                <InfoCard
                  key={key + idx}
                  Icon={Icon}
                  description={t(`${key}.description`)}
                  title={t(`${key}.title`)}
                />
              ))}
            </div>

            <PathwayButtons t={t} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathwayCard;
