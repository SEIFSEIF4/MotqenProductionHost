import React from "react";
import Image, { type StaticImageData } from "next/image";

const InfoCard = ({
  IconSrc,
  iconAlt,
  title,
  description,
}: {
  IconSrc: StaticImageData;
  iconAlt: string;
  title: string;
  description: string;
}) => (
  <div className="flex items-center gap-2">
    <span className="relative -top-1 inline-flex h-8 w-8 items-start justify-center rounded-full bg-gray-100">
      <Image src={IconSrc} alt={iconAlt} />
    </span>
    <div>
      <span className="font-bold text-black">{description}</span>
      <p className="text-base text-[#161616]">{title}</p>
    </div>
  </div>
);

export default InfoCard;
