import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";

import Logo from "./icons/FooterLogo";
import { FooterIcons } from "@/components/icons";
import { Separator } from "./ui/separator";
import { Link } from "next-view-transitions";

const Footer = () => {
  const locale = useLocale();
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="group relative overflow-hidden bg-primary py-6 text-sm text-white">
      {/* Decorative Background */}
      <FooterIcons.Pattern className="absolute bottom-0 left-0 -z-10 group-hover:opacity-100" />

      {/* Top Section */}
      <div className="container z-10 mx-auto flex max-w-base flex-wrap items-center justify-between space-y-4 px-4 md:flex-row md:space-y-0">
        <div className="flex items-end gap-2">
          <Link href={`/${locale}`}>
            <Logo />
          </Link>
          <div
            className="text-sm font-semibold"
            style={{ lineHeight: "1rem", letterSpacing: "0.2px" }}
          >
            <p>{t("logoText.title")}</p>
            <p>{t("logoText.description")}</p>
            <p className="text-xs font-normal">{t("logoText.licenseNum")}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <a
            href="https://www.whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("ariaLabels.whatsApp")}
            className="cursor-pointer hover:opacity-75"
          >
            <FooterIcons.WhatsApp />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("ariaLabels.instagram")}
            className="cursor-pointer hover:opacity-75"
          >
            <FooterIcons.Instagram />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("ariaLabels.twitter")}
            className="cursor-pointer hover:opacity-75"
          >
            <FooterIcons.Twitter />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("ariaLabels.linkedIn")}
            className="cursor-pointer hover:opacity-75"
          >
            <FooterIcons.LinkedIn />
          </a>
        </div>
      </div>

      {/* Middle Section */}
      <div className="container z-10 mx-auto mt-4 flex max-w-base flex-col items-center justify-between space-y-4 px-4 md:flex-row md:space-y-0">
        <div className="flex flex-wrap gap-3 text-center md:text-right">
          {/* Location */}
          <div className="flex w-full items-center gap-x-1 md:w-auto">
            <MapPin className="h-[18px] w-[18px]" aria-hidden="true" />
            <p>{t("location")}</p>
          </div>
          {/* Phone */}
          <div className="flex items-center gap-x-1">
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
            <a
              href="tel:+966550000000"
              className="hover:underline"
              aria-label={t("ariaLabels.phone")}
              dir="ltr"
            >
              +966 55 000 0000
            </a>
          </div>
          {/* Email */}
          <div className="flex items-center gap-x-1">
            <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
            <p>
              <a
                href="mailto:email@example.com"
                className="hover:underline"
                aria-label={t("ariaLabels.email")}
              >
                email@example.com
              </a>
            </p>
          </div>
        </div>
        {/* Privacy and Terms */}
        <div className="flex items-center gap-x-3">
          <a href="#" className="hover:underline">
            {t("terms")}
          </a>
          <a href="#" className="hover:underline">
            {t("privacy")}
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <Separator className="mx-auto mt-4 max-w-base bg-[rgba(255,255,255,0.25)] px-horizontalSpace opacity-25" />
      <p className="mb-6 mt-4 text-center">
        {t("rights", { year: currentYear })}
      </p>
    </footer>
  );
};

export default Footer;
