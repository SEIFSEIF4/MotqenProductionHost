import React from "react";
import { useTranslations } from "next-intl";
import PathwayHeader from "./PathwayHeader";
import PathwayContent from "./PathwayContent";
import PathwayTabsContent from "./PathwayTabsContent";

const PathwayCard = ({ order }: { order: string }) => {
  const t = useTranslations(`Programs.${order}`);
  const subtitle: string[] = t.raw("subtitle");

  return (
    <div className="mx-auto py-4">
      <div className="relative mb-[27rem] bg-[#155C67] p-6 pb-12 text-white md:mb-0">
        <PathwayHeader title={t("title")} />
        {subtitle.map((label, idx) => (
          <p
            key={label + idx}
            className="m-2 inline-block rounded-lg border px-3 py-2 text-sm font-medium"
          >
            {label}
          </p>
        ))}
        <div className="absolute left-1/2 top-[90%] w-5/6 -translate-x-1/2 rounded-xl bg-white text-gray-900 shadow-md lg:rounded-lg">
          {order !== "third" ? (
            <PathwayContent t={t} order={order} />
          ) : (
            <PathwayTabsContent t={t} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PathwayCard;
