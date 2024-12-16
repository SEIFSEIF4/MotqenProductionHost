import React from "react";
import { SectionWrapper } from "@/components/Wrapper";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";
import { SubTitle } from "@/components/ui/heading";
import { getTranslations } from "next-intl/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { HomeIcons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";

// Mock navigation items for the buttons/tags
const navItems = [
  { link: "policies-disclosure", isActive: true },
  { link: "financial-statements" },
  { link: "program-reports" },
  { link: "regulations" },
  { link: "annual-documents" },
  { link: "general-meetings" },
];

export default async function GovernancePages() {
  const t = await getTranslations("GovernancePage");
  return (
    <SectionWrapper isSinglePage id="governance" className="bg-[#F3F4F6] px-6">
      <DynamicBreadcrumb />
      <SubTitle text={t("title")} />
      <p className="mt-4">{t("description")}</p>
      {/* Navigation Buttons Section */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        {navItems.map((item) => (
          <Link
            key={item.link}
            href={"/ar/governance"}
            aria-label="افتح الملف"
            className={`w-full rounded-xl border px-4 py-2 text-start text-lg font-medium md:w-auto md:rounded-2xl ${item?.isActive ? "bg-primary text-white" : "border-gray-300 text-primary hover:bg-gray-100"} `}
          >
            {t(`Filters.${item.link}`)}
          </Link>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <Card
            key={index}
            className="flex flex-col items-start gap-4 rounded-2xl bg-white p-4 shadow-md duration-300 hover:rounded-3xl hover:shadow-lg"
          >
            {/* Top Section - Icon with Background */}
            <CardContent className="group flex h-44 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[rgba(231,247,249,1)] to-[rgba(199,223,227,1)] p-4 duration-300 hover:rounded-3xl">
              <span className="z-10 rounded-full bg-[#C9E3E7] p-4">
                <HomeIcons.File className="" />
              </span>
            </CardContent>

            {/* Title Text */}
            <CardHeader className="p-0 text-start">
              <CardTitle className="text-md font-bold text-black">
                {t(`example.title`)}
              </CardTitle>
            </CardHeader>

            {/* Button */}
            <CardFooter className="p-0">
              <a
                href={"https://drive.google.com/drive"}
                className={cn(buttonVariants({ variant: "outline" }), "")}
              >
                <Eye />
                {t("button")}
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </SectionWrapper>
  );
}
