import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

// Global Components
import { SubTitle } from "@/components/ui/heading";
import { SectionWrapper } from "@/components/Wrapper";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";
import { constructMetadata } from "@/lib/utils";

// Page based Components
import Contact from "@/images/contact.jpg";
import ContactForm from "./_components/contact-form";
import CardDetails from "./_components/card-details";

// Generate static paths for each locale
export async function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

// Generate static metadata for each locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;

  const t = await getTranslations({ locale, namespace: "contactUsPage" });

  return constructMetadata({
    title: t("title"),
    description: t("description"),
  });
}

export default function ContactPage() {
  const t = useTranslations("contactUsPage");

  return (
    <SectionWrapper isSinglePage id="contactUs" className="bg-[#F3F4F6] px-6">
      <DynamicBreadcrumb />
      <SubTitle text={t("title")} />
      <p className="mt-4">{t("description")}</p>
      <div className="mt-8 flex w-full flex-col items-start justify-between gap-5 overflow-hidden rounded-lg bg-white lg:flex-row">
        <ContactForm />
        <div className="relative h-full">
          <div
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-gradient-to-b from-[rgba(21,92,103,0.9)] to-[rgba(31,42,55,0.9)] duration-300 group-hover:rounded-3xl"
            aria-hidden="true"
          />
          <CardDetails />
          <Image
            quality={50}
            src={Contact}
            alt={t("imageAlt")}
            className="aspect-square min-h-[514px] w-auto rounded-lg object-cover lg:max-w-[416px]"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
