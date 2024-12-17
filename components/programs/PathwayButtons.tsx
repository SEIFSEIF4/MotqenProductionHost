import React from "react";
import Image from "next/image";

import LeadingIcon from "@/images/leading-icon.png";

const PathwayButtons = ({ t }: { t: (key: string) => string }) => (
  <div className="mt-4 flex flex-col-reverse items-start justify-start gap-2 text-sm md:flex-row">
    <button className="rounded-md bg-[#165C67] px-4 py-2 text-white">
      <Image
        src={LeadingIcon}
        alt="Leading Icon"
        className="ml-1 inline-block aspect-square w-5 rounded-md object-cover"
      />
      {t("buttons.women")}
    </button>
    <button className="rounded-md bg-[#165C67] px-4 py-2 text-white">
      <Image
        src={LeadingIcon}
        alt="Leading Icon"
        className="ml-1 inline-block aspect-square w-5 rounded-md object-cover"
      />
      {t("buttons.men")}
    </button>
  </div>
);

export default PathwayButtons;
