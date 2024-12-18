import React from "react";

const PathwayTypes = ({ t }: { t: (key: string) => string }) => (
  <div className="mb-4 flex rounded-xl border lg:rounded-lg">
    <div className="flex flex-1 items-center justify-center rounded-xl bg-[#6FA0A7] p-3 text-base font-bold text-white lg:rounded-lg lg:p-6 lg:text-lg">
      <p>{t("pathType.two")}</p>
    </div>
    <div className="flex flex-1 items-center justify-center p-3 text-base font-bold lg:p-6 lg:text-lg">
      <p>{t("pathType.one")}</p>
    </div>
  </div>
);

export default PathwayTypes;
