import React from "react";
import { useTranslations } from "next-intl";

import { Linkedin, Mail, Twitch, Twitter, TwitterIcon } from "lucide-react";

import { HomeIcons } from "@/components/icons";
import { SubTitle } from "@/components/ui/heading";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BodyClassWrapper, SectionWrapper } from "@/components/Wrapper";

export default function Members() {
  const t = useTranslations("MembersPage");
  const tf = useTranslations("Footer");
  return (
    <BodyClassWrapper className="bg-[#F3F4F6]">
      <SectionWrapper isSinglePage id="goals" className="bg-[#F3F4F6] px-4">
        <DynamicBreadcrumb />
        <SubTitle text={t("title")} />
        <p className="mt-4">{t("description")}</p>
        <div className="grid grid-cols-1 gap-x-5 gap-y-3 py-5 sm:grid-cols-2 md:grid-cols-3 md:py-16 lg:md:grid-cols-4 xl:grid-cols-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
            <div
              key={index}
              className="single flex flex-col items-center justify-center rounded-2xl bg-white p-6"
            >
              <div className="relative">
                <HomeIcons.LargeLeaf className="absolute -right-4 -top-4" />
                <Avatar className="h-40 w-40">
                  <AvatarImage
                    src="/images/avatar.png"
                    alt="avatar"
                    className="object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="mt-6 text-center">
                <h2 className="text-lg font-bold text-[#1F2A37]">
                  أحمد بن صالح العبدالله
                </h2>
                <p className="mt-2">رئيس مجلس الإدارة</p>
              </div>
              <div className="mt-6 flex items-center justify-center gap-x-4">
                <a
                  href="mailto:email@example.com"
                  className="rounded-sm border p-3 hover:underline"
                >
                  <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tf("ariaLabels.twitter")}
                  className="cursor-pointer rounded-sm border p-3 hover:opacity-75"
                >
                  <TwitterIcon className="h-[18px] w-[18px]" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tf("ariaLabels.linkedIn")}
                  className="flex cursor-pointer items-center justify-center rounded-sm border p-3 hover:opacity-75"
                >
                  <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </BodyClassWrapper>
  );
}
