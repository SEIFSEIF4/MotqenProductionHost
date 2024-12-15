"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations, useLocale } from "next-intl";
import { getLangDir } from "rtl-detect";
import { Link } from "next-view-transitions";
import { cn } from "@/lib/utils";

export default function DynamicBreadcrumb({
  className,
  isDynamicRoute,
}: {
  className?: string;
  isDynamicRoute?: string;
}) {
  const pathname = usePathname(); // Get the current URL
  const locale = useLocale(); // Retrieve the current locale en/ar
  const direction = getLangDir(locale); // Determine the text direction (rtl/ltr)

  const t = useTranslations("Breadcrumbs"); // Get translation based on locale

  // Split the pathname into segments and remove the locale part
  const segments = pathname.split("/").filter(Boolean).slice(1);

  return (
    <Breadcrumb rtl={direction === "rtl"} className={cn("mb-6", className)}>
      <BreadcrumbList>
        {/* Home link */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">{t("home")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator rtl={direction === "rtl"} />
            <BreadcrumbItem>
              {index < segments.length - 1 ? (
                // Intermediate breadcrumb links
                <BreadcrumbLink asChild>
                  <Link
                    href={`/${locale}/${segments.slice(0, index + 1).join("/")}`}
                  >
                    {t(segment)}
                  </Link>
                </BreadcrumbLink>
              ) : (
                // Current page
                <BreadcrumbPage className="text-[#9DA4AE]">
                  {!!isDynamicRoute ? t(isDynamicRoute) : t(segment)}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
