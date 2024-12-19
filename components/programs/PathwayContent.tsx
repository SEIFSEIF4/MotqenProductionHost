import React from "react";
import InfoCard from "./InfoCard";
import PathwayButtons from "./PathwayButtons";

import RamadhanMonth from "../icons/RamadhanMonth";
import QuranFill from "../icons/QuranFill";
import GraduationScroll from "../icons/GraduationScroll";
import Tasbih from "../icons/Tasbih";

const PathwayContent = ({
  t,
  order,
}: {
  t: (key: string) => string;
  order: string;
}) => {
  const iconMap: Record<string, any> = {
    duration: RamadhanMonth,
    howMuch: QuranFill,
    days: order === "pathOne" ? GraduationScroll : Tasbih,
  };

  return (
    <div className="p-4">
      <p className="mb-6 text-base font-medium leading-6 lg:text-lg">
        {t(`description`)}
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
      <PathwayButtons t={t} order={order} />
    </div>
  );
};

export default PathwayContent;
