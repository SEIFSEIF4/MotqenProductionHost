import { useLocale } from "next-intl";
import React from "react";

const InfoCard = ({
  Icon,
  title,
  description,
  order,
  locale,
}: {
  Icon: any;
  title: string;
  description: string;
  order: string;
  locale: string;
}) => (
  <div
    className={`flex ${locale === "ar" && order === "third" ? "flex-row-reverse text-end" : "flex-row text-start"} items-center gap-2`}
  >
    <span className="relative -top-1 inline-flex h-8 w-8 items-start justify-center rounded-full bg-gray-100">
      <Icon />
    </span>
    <div>
      <span className="font-bold text-black">{description}</span>
      <p className="text-base text-[#161616]">{title}</p>
    </div>
  </div>
);

export default InfoCard;
