import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import RamadhanMonth from "@/images/ramadhan-month.png";
import Quran from "@/images/quran.png";
import GraduationScroll from "@/images/graduation-scroll.png";
import LeadingIcon from "@/images/leading-icon.png";
import Tasbih from "@/images/tasbih.png";

const PathwayCard = ({ order }: { order: string }) => {
  const t = useTranslations(`Programs.${order}`);
  const subtitle = t.raw("subtitle");

  return (
    <div className="mx-auto py-4">
      <div className="relative mb-[27rem] bg-[#155C67] p-6 pb-12 text-white md:mb-0">
        <div className="my-6 flex items-center space-x-3 rtl:space-x-reverse">
          <span
            className="h-9 w-2 rounded-lg bg-slate-300"
            aria-hidden="true"
          />
          <h1 className={`text-3xl font-bold text-white`}>{t("title")}</h1>
        </div>

        {subtitle.map((label: string, idx: number) => (
          <p
            key={label + idx}
            className="m-2 inline-block rounded-lg border px-3 py-2 text-sm font-medium"
          >
            {label}
          </p>
        ))}

        <div className="absolute left-1/2 top-[90%] w-5/6 -translate-x-1/2 rounded-xl bg-white text-gray-900 shadow-md lg:rounded-lg">
          {order === "third" && (
            <div className="mb-4 flex rounded-xl border lg:rounded-lg">
              <div className="flex flex-1 items-center justify-center rounded-xl bg-[#6FA0A7] p-3 text-base font-bold text-white lg:rounded-lg lg:p-6 lg:text-lg">
                <p>{t("pathType.two")}</p>
              </div>
              <div className="flex flex-1 items-center justify-center p-3 text-base font-bold lg:p-6 lg:text-lg">
                <p>{t("pathType.one")}</p>
              </div>
            </div>
          )}

          <div className="p-4">
            <p className="mb-6 text-base font-medium leading-6 lg:text-lg">
              {t("description")}
            </p>
            <div className="flex flex-col justify-start gap-y-6 p-2 text-lg md:flex-row md:gap-x-12 lg:gap-x-52">
              <div className="flex items-center gap-2">
                <span className="relative -top-1 inline-flex h-8 w-8 items-start justify-center rounded-full bg-gray-100">
                  <Image src={RamadhanMonth} alt="RamadhanMonth" />
                </span>
                <div>
                  <span className="font-bold text-black">
                    {t("duration.description")}
                  </span>
                  <p className="text-base text-[#161616]">
                    {t("duration.title")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative -top-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                  <Image src={Quran} alt="Quran" />
                </span>
                <div>
                  <span className="font-bold text-black">
                    {t("howMuch.description")}
                  </span>
                  <p className="text-base text-[#161616]">
                    {t("howMuch.title")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative -top-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                  {order === "first" ? (
                    <Image src={GraduationScroll} alt="GraduationScroll" />
                  ) : (
                    <Image src={Tasbih} alt="Tasbih" />
                  )}
                </span>
                <div>
                  <span className="font-bold text-black">
                    {t("days.description")}
                  </span>
                  <p className="text-base text-[#161616]">{t("days.title")}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col-reverse items-start justify-start gap-2 text-sm md:flex-row">
              <button className="rounded-md bg-[#165C67] px-4 py-2 text-white">
                <Image
                  src={LeadingIcon}
                  alt="Leading Icon"
                  className="ml-1 inline-block aspect-square w-5 rounded-md object-cover"
                />
                {t("buttons.women")}
              </button>
              <button className="rounded-md bg-[#165C67] px-4 py-2 text-white">
                <Image
                  src={LeadingIcon}
                  alt="Leading Icon"
                  className="ml-1 inline-block aspect-square w-5 rounded-md object-cover"
                />
                {t("buttons.men")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathwayCard;
