import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PathwayContent from "./PathwayContent";
import { useLocale } from "next-intl";

const PathwayTabsContent = ({ t }: { t: (key: string) => string }) => {
  const locale = useLocale();

  const pathOne = "pathOne";
  const pathTwo = "pathTwo";

  return (
    <Tabs
      defaultValue={locale === "ar" ? pathTwo : pathOne}
      className="mb-4 flex flex-col rounded-xl bg-transparent lg:rounded-lg"
    >
      <TabsList>
        <TabsTrigger
          value={pathOne}
          className="flex flex-1 items-center justify-center p-3 font-semibold text-black data-[state=active]:rounded-xl data-[state=active]:bg-[#6FA0A7] data-[state=active]:text-white lg:p-6 lg:text-lg data-[state=active]:lg:rounded-lg"
          style={{ fontSize: "1.25rem", lineHeight: "1.75rem" }}
        >
          {t(`pathType.${pathOne}.title`)}
        </TabsTrigger>
        <TabsTrigger
          value={pathTwo}
          className="flex flex-1 items-center justify-center p-3 font-semibold text-black data-[state=active]:rounded-xl data-[state=active]:bg-[#6FA0A7] data-[state=active]:text-white lg:p-6 lg:text-lg data-[state=active]:lg:rounded-lg"
          style={{ fontSize: "1.25rem", lineHeight: "1.75rem" }}
        >
          {t(`pathType.${pathTwo}.title`)}
        </TabsTrigger>
      </TabsList>
      <TabsContent value={pathOne}>
        <PathwayContent t={t} order="third" value={pathOne} />
      </TabsContent>
      <TabsContent value={pathTwo}>
        <PathwayContent t={t} order="third" value={pathTwo} />
      </TabsContent>
    </Tabs>
  );
};

export default PathwayTabsContent;
