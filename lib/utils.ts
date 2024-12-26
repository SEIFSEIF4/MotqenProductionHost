import type { Metadata } from "next";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ar";
import calendarSystems from "@calidy/dayjs-calendarsystems";
import HijriCalendarSystem from "@calidy/dayjs-calendarsystems/calendarSystems/HijriCalendarSystem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const copyToClipboard = (text: string, toastMessage?: string) => {
  navigator.clipboard.writeText(text);
  toast.success(toastMessage ?? "تم نسخ النص إلى الحافظة!");
};

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function constructMetadata({
  title = "Motqen | متقن",
  description = "جمعية متقن لتعليم القرآن الكريم هي جمعية تعنى بالبرامـج القرآنية النوعية المحكمة، التي تركز على إتقان حفظ القرآن الكريم وتعليمه، وفق المنهج التخصصي الصحيح، بأحدث الوسائل التعليمية والتقنية المساعدة على تعظيم الأثر وتوسيع نطاق المستفيدين.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons,
    metadataBase: new URL("https://motqen.sa"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export function convertToHijriDate(date: string) {
  dayjs.extend(utc);
  dayjs.extend(calendarSystems);
  dayjs.registerCalendarSystem("islamic", new HijriCalendarSystem());

  return dayjs(date)
    .toCalendarSystem("islamic")
    .locale("ar")
    .format("D MMMM YYYY هـ")
    .replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d as any]);
}
