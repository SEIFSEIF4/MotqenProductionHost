import React from "react";

import LeadingIcon from "../icons/LeadingIcon";

const PathwayButtons = ({ t }: { t: (key: string) => string }) => (
  <div className="mt-4 flex flex-col-reverse items-start justify-start gap-2 text-sm md:flex-row">
    <button className="flex items-center gap-1 rounded-md bg-[#165C67] px-4 py-2 text-white">
      <LeadingIcon />
      {t("buttons.women")}
    </button>
    <button className="flex items-center gap-1 rounded-md bg-[#165C67] px-4 py-2 text-white">
      <LeadingIcon />
      {t("buttons.men")}
    </button>
  </div>
);

export default PathwayButtons;
