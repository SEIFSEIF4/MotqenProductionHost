import React from "react";
import { useTranslations } from "next-intl";

import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";
import { BodyClassWrapper, SectionWrapper } from "@/components/Wrapper";
import { SubTitle } from "@/components/ui/heading";
import Image from "next/image";
import About from "@/images/contact.jpg";
import ContactForm from "./_components/contact-form";
import CardDetails from "./_components/card-details";

export default function ContactPage() {
  const t = useTranslations("contactUsPage");

  return (
    <BodyClassWrapper className="bg-[#F3F4F6]">
      <SectionWrapper isSinglePage id="contactUs" className="bg-[#F3F4F6]">
        <DynamicBreadcrumb />
        <SubTitle text={t("title")} />
        <p className="mt-4">{t("description")}</p>
        <div className="mt-8 flex w-full flex-col items-start justify-between overflow-hidden rounded-lg bg-white md:flex-row">
          <ContactForm />
          <div className="relative h-full">
            <div
              className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-gradient-to-b from-[rgba(21,92,103,0.9)] to-[rgba(31,42,55,0.9)] duration-300 group-hover:rounded-3xl"
              aria-hidden="true"
            />
            <CardDetails />
            <Image
              src={About}
              quality={50}
              alt="Contact us"
              className="aspect-square h-[514px] w-auto max-w-[416px] shrink-0 rounded-lg object-cover"
            />
          </div>
        </div>
      </SectionWrapper>
    </BodyClassWrapper>
  );
}
