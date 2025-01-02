"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { Copy, Phone, Mail, MapPin, SquareArrowOutUpRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ContactIcons } from "@/components/icons";
import { copyToClipboard } from "@/lib/utils";

export default function CardDetails() {
  const t = useTranslations("contactUsPage");

  const contactDetails = [
    {
      icon: Phone,
      title: t("phone"),
      details: "+966508811448",
      subIcon: Copy,
      link: "tel:+966508811448",
    },
    {
      icon: Mail,
      title: t("email"),
      details: "Info@motqen.sa",
      subIcon: Copy,
      link: "mailto:Info@motqen.sa",
    },
    {
      icon: MapPin,
      title: t("location"),
      details: t("address"),
      subIcon: SquareArrowOutUpRight,
      link: `https://maps.google.com/?q=${t("address")}`,
    },
  ];

  const socialMediaLinks = [
    {
      icon: ContactIcons.TwitterFilled,
      link: "https://x.com/motqn100",
      ariaLabel: t("socialMedia.twitter"),
    },
    {
      icon: ContactIcons.InstagramFilled,
      link: "https://www.instagram.com/motqn100",
      ariaLabel: t("socialMedia.instagram"),
    },
    // {
    //   icon: ContactIcons.LinkedInFilled,
    //   link: "https://www.linkedin.com",
    //   ariaLabel: t("socialMedia.linkedin"),
    // },
    {
      icon: ContactIcons.WhatsappFilled,
      link: "https://wa.me/+966508811448",
      ariaLabel: t("socialMedia.whatsapp"),
    },
  ];

  return (
    <div className="absolute inset-0 z-20 rounded-lg p-5 md:p-10">
      <h2 className="mb-10 text-2xl font-bold text-white">
        {t("contactInfo")}
      </h2>
      {contactDetails.map((item, index) => (
        <div key={index} className="mt-4 flex items-start gap-x-2 gap-y-4">
          <item.icon className="mt-1 text-white" />
          <div>
            <p className="text-xl font-bold text-[#9CC2C7]">{item.title}</p>
            <div className="flex items-center gap-x-1 text-white">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75"
                aria-label={`${item.title} ${t("open")}`}
              >
                {item.details}
              </a>
              {index === contactDetails.length - 1 ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.title} ${t("open")}`}
                >
                  <item.subIcon
                    className="h-5 w-5"
                    aria-label={`${item.title} ${t("open")}`}
                  />
                </a>
              ) : (
                <item.subIcon
                  className="h-5 w-5 cursor-pointer"
                  onClick={() =>
                    copyToClipboard(item.details, t("toastMessage"))
                  }
                  aria-label={`${item.title} ${t("copy")}`}
                />
              )}
            </div>
          </div>
        </div>
      ))}
      <Separator className="mx-auto my-6 w-11/12 bg-[#155C67]" />
      <div className="mt-10 flex flex-col">
        <p className="text-lg font-bold text-[#9CC2C7]">{t("followUs")}</p>
        <ul className="mt-2 flex gap-x-2">
          {socialMediaLinks.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.ariaLabel} ${t("followUs")}`}
                className="cursor-pointer hover:opacity-75"
              >
                <item.icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
