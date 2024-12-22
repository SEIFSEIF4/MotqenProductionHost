import React from "react";
import InfoCard from "./InfoCard";
import PathwayButtons from "./PathwayButtons";

import RamadhanMonth from "../icons/RamadhanMonth";
import QuranFill from "../icons/QuranFill";
import GraduationScroll from "../icons/GraduationScroll";
import Tasbih from "../icons/Tasbih";
import { useLocale } from "next-intl";

const PathwayContent = ({
  t,
  order,
  value,
}: {
  t: (key: string) => string;
  order: string;
  value?: string;
}) => {
  const locale = useLocale();

  const iconMap: Record<string, any> = {
    duration: RamadhanMonth,
    howMuch: QuranFill,
    days: order === "first" ? GraduationScroll : Tasbih,
  };

  return (
    <>
      {order === "third" ? (
        <div
          className={`flex flex-col ${locale === "ar" ? "items-end text-right" : "items-start text-left"} justify-center p-4`}
        >
          <p className="mb-6 text-base font-medium lg:text-lg">
            {t(`description`)}
          </p>
          <div className="flex flex-col justify-start gap-y-6 p-2 text-lg md:flex-row md:gap-x-12 lg:gap-x-52">
            {Object.entries(iconMap).map(([key, Icon], idx) => (
              <InfoCard
                key={key + idx}
                Icon={Icon}
                description={t(`pathType.${value}.${key}.description`)}
                title={t(`pathType.${value}.${key}.title`)}
                order={order}
                locale={locale}
              />
            ))}
          </div>
          <PathwayButtons t={t} order={order} locale={locale} />
        </div>
      ) : (
        <div className="p-4">
          <p className="mb-6 text-base font-medium lg:text-lg">
            {t(`description`)}
          </p>
          <div className="flex flex-col gap-y-6 p-2 text-lg md:flex-row md:gap-x-12 lg:gap-x-52">
            {Object.entries(iconMap).map(([key, Icon], idx) => (
              <InfoCard
                key={key + idx}
                Icon={Icon}
                description={t(`${key}.description`)}
                title={t(`${key}.title`)}
                order={order}
                locale={locale}
              />
            ))}
          </div>
          <PathwayButtons t={t} order={order} locale={locale} />
        </div>
      )}
    </>
  );
};

export default PathwayContent;
