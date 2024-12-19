import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PathwayContent from "./PathwayContent";

const PathwayTabsContent = ({ t }: { t: (key: string) => string }) => (
  <Tabs
    defaultValue="pathOne"
    className="mb-4 flex flex-col rounded-xl border bg-transparent lg:rounded-lg"
  >
    <TabsList>
      <TabsTrigger
        value="pathOne"
        className="flex flex-1 items-center justify-center rounded-xl bg-[#6FA0A7] p-3 text-base font-bold text-white lg:rounded-lg lg:p-6 lg:text-lg"
      >
        {t("pathType.one")}
      </TabsTrigger>
      <TabsTrigger
        value="pathTwo"
        className="flex flex-1 items-center justify-center p-3 text-base font-bold lg:p-6 lg:text-lg"
      >
        {t("pathType.two")}
      </TabsTrigger>
    </TabsList>
    <TabsContent value="pathOne">
      <PathwayContent t={t} order="pathOne" />
    </TabsContent>
    <TabsContent value="pathTwo">
      <PathwayContent t={t} order="pathTwo" />
    </TabsContent>
  </Tabs>
);

export default PathwayTabsContent;
