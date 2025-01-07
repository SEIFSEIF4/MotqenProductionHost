import React from "react";
import { SectionWrapper } from "@/components/Wrapper";
import DynamicBreadcrumb from "@/components/dynamicBreadcrumb";
import { SubTitle } from "@/components/ui/heading";
import { getTranslations } from "next-intl/server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { HomeIcons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { cn, constructMetadata } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { Suspense } from "react";
import {
  GovernanceCategory,
  GOVERNANCE_CATEGORIES,
} from "@/constant/governance";
import { getCategoryDocument } from "@/sanity/lib/news/governanceDocument";

// export const dynamic = "auto";
export const revalidate = 3600; // Revalidate every hour

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
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "GovernancePage" });

  return constructMetadata({
    title: t("title"),
    description: t("description"),
  });
}

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}

export default async function GovernancePage({
  params,
  searchParams,
}: PageProps) {
  const { category } = await searchParams;
  const activeCategory = category || "policies-disclosure";

  const [{ locale }, documents, t] = await Promise.all([
    params,
    getCategoryDocument(activeCategory),
    getTranslations("GovernancePage"),
  ]);

  return (
    <SectionWrapper isSinglePage id="governance" className="bg-[#F3F4F6] px-6">
      <DynamicBreadcrumb />
      <SubTitle text={t("title")} />
      <p className="mt-4">{t("description")}</p>

      {/* Navigation Buttons Section */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        {GOVERNANCE_CATEGORIES.map((item) => (
          <Link
            key={item.link}
            href={`/${locale}/governance${item.link !== "policies-disclosure" ? `?category=${item.link}` : ""}`}
            className={cn(
              "w-full rounded-xl border px-4 py-2 text-start text-lg font-medium md:w-auto md:rounded-2xl",
              item.link === activeCategory
                ? "bg-primary text-white"
                : "border-gray-300 text-primary hover:bg-gray-100",
            )}
          >
            {t(`Filters.${item.link}`)}
          </Link>
        ))}
      </div>

      {/* Documents Grid */}
      <Suspense
        fallback={
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        }
      >
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {documents.map((doc) => (
            <Card
              key={doc._id}
              className="flex flex-col items-start gap-4 rounded-2xl bg-white p-4 shadow-md duration-300 hover:rounded-3xl hover:shadow-lg"
            >
              <CardContent className="group flex h-44 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[rgba(231,247,249,1)] to-[rgba(199,223,227,1)] p-4 duration-300 hover:rounded-3xl">
                <span className="z-10 rounded-full bg-[#C9E3E7] p-4">
                  <HomeIcons.File />
                </span>
              </CardContent>

              <CardHeader className="p-0 text-start">
                <CardTitle className="text-md font-bold text-black">
                  {doc.title?.[locale as "en" | "ar"] ?? "يوجد خطأ بالعنوان"}
                </CardTitle>
              </CardHeader>

              <CardFooter className="p-0">
                <a
                  href={doc.document?.[locale as "en" | "ar"] ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  {t("button")}
                </a>
              </CardFooter>
            </Card>
          ))}

          {documents.length === 0 && (
            <div className="col-span-full mt-5 text-center text-2xl text-gray-500">
              {t("noDocuments")}
            </div>
          )}
        </div>
      </Suspense>
    </SectionWrapper>
  );
}
