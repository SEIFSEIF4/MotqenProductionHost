import React from "react";
import { useTranslations } from "next-intl";

import { SectionWrapper } from "@/components/Wrapper";
import { SubTitle } from "../ui/heading";

function Goals() {
  const t = useTranslations("HomePage.GoalsSection");
  const goals = ["goal1", "goal2", "goal3", "goal4"] as const;

  return (
    <SectionWrapper id="goals" className="bg-white">
      <SubTitle text={t("title")} />
      <div className="grid grid-cols-1 gap-x-5 gap-y-3 py-5 md:grid-cols-2 md:px-16 md:py-16">
        {goals.map((item, idx) => (
          <div key={idx} className="flex w-full items-center gap-x-5 py-8">
            <div
              className="leaf flex h-32 w-24 items-center justify-center rounded-lg bg-cover bg-center"
              style={{ backgroundImage: "url(/images/leaf.png)" }}
            >
              <h2 className="text-xl font-bold text-primary">
                {t(`Goals.${item}.title`)}
              </h2>
            </div>
            <p className="ml-auto text-center font-bold text-black md:w-2/3">
              {t(`Goals.${item}.description`)}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default Goals;
