"use client";

import React from "react";

import { Copy, Phone, Mail, MapPin, SquareArrowOutUpRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ContactIcons } from "@/components/icons";
import { copyToClipboard } from "@/lib/utils";

const socialMediaLinks = [
  {
    icon: ContactIcons.TwitterFilled,
    link: "https://www.twitter.com",
    ariaLabel: "Twitter",
  },
  {
    icon: ContactIcons.InstagramFilled,
    link: "https://www.instagram.com",
    ariaLabel: "Instagram",
  },
  {
    icon: ContactIcons.LinkedInFilled,
    link: "https://www.linkedin.com",
    ariaLabel: "LinkedIn",
  },
  {
    icon: ContactIcons.WhatsappFilled,
    link: "https://wa.me/yourwhatsappnumber", // change WhatsApp number
    ariaLabel: "WhatsApp",
  },
];

const contactDetails = [
  {
    icon: Phone,
    title: "رقم الجوال",
    details: "9200343222",
    subIcon: Copy,
    link: "tel:9200343222", // Phone link
  },
  {
    icon: Mail,
    title: "البريد الالكتروني",
    details: "help@company.sa",
    subIcon: Copy,
    link: "mailto:help@company.sa", // Email link
  },
  {
    icon: MapPin,
    title: "الموقع",
    details: "جدة، المملكة العربية السعودية ",
    subIcon: SquareArrowOutUpRight,
    link: "https://maps.google.com/?q=جدة، المملكة العربية السعودية", // Google Maps link
  },
];

export default function CardDetails() {
  return (
    <div className="absolute inset-0 z-20 p-10">
      <h2 className="mb-10 text-2xl font-bold text-white">معلومات التواصل</h2>
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
                aria-label={`Open ${item.title}`}
              >
                {item.details}
              </a>
              <item.subIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => copyToClipboard(item.details)}
                aria-label={`Copy ${item.title}`}
              />
            </div>
          </div>
        </div>
      ))}
      <Separator className="mx-auto my-6 w-11/12 bg-[#155C67]" />
      <div className="mt-10 flex flex-col">
        <p className="text-lg font-bold text-[#9CC2C7]">تابعنا على</p>
        <ul className="mt-2 flex gap-x-2">
          {socialMediaLinks.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${item.ariaLabel}`}
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
