import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import RamadhanMonth from "@/images/ramadhan-month.png";
import Quran from "@/images/quran.png";
import GraduationScroll from "@/images/graduation-scroll.png";
import LeadingIcon from "@/images/leading-icon.png";

const PathwayCard = ({ order }: { order: string }) => {
  const t = useTranslations(`Programs.${order}`);
  const subtitle = t.raw("subtitle");

  return (
    <div className="mx-auto p-4">
      <div className="relative rounded-lg bg-[#155C67] p-6 pb-12 text-white">
        <div className="my-6 flex items-center space-x-3 rtl:space-x-reverse">
          <span
            className="h-9 w-2 rounded-lg bg-slate-300"
            aria-hidden="true"
          />
          <h1 className={`text-3xl font-bold text-white`}>{t("title")}</h1>
        </div>

        {subtitle.map((label: string, idx: number) => (
          <span key={label + idx} className="m-2 rounded-lg border p-2 text-sm">
            {label}
          </span>
        ))}

        <div className="absolute left-1/2 top-[90%] w-[80vw] -translate-x-1/2 rounded-lg bg-white text-gray-900 shadow-md">
          {order === "third" && (
            <div className="mb-4 flex rounded-lg border">
              <div className="flex flex-1 items-center justify-center rounded-lg bg-[#6FA0A7] p-6 text-lg font-bold text-white">
                <p>مسار وجهين</p>
              </div>
              <div className="flex flex-1 items-center justify-center p-6 text-lg font-bold">
                <p>مسار وجه واحد</p>
              </div>
            </div>
          )}

          <div className="p-4">
            <p className="mb-6 text-lg font-medium leading-6">
              {t("description")}
            </p>
            <div className="flex flex-col justify-start gap-x-52 p-2 text-lg md:flex-row">
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
                  <Image src={GraduationScroll} alt="GraduationScroll" />
                </span>
                <div>
                  <span className="font-bold text-black">
                    {t("days.description")}
                  </span>
                  <p className="text-base text-[#161616]">{t("days.title")}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-start gap-2 text-sm">
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

    // <div className="bg-[#155C67] p-6 text-white shadow-md md:flex md:items-center md:justify-between">
    //   <div>
    //     <SubTitle text={t("title")} />
    //     <h2 className="mb-2 text-xl font-bold">مسار الإقراء</h2>
    //     <p className="mb-4">
    //       هو مسار يعني بمن أتقن كتاب الله، وأراد الترقِّي في درجات المهارة
    //       والأداء، تحت إطار منهج مرسوم ومتابعة يومية.
    //     </p>
    //     <div className="space-y-3">
    //       <div className="flex items-center gap-2">
    //         <span className="material-icons rounded-full bg-teal-900 p-2">
    //           calendar_today
    //         </span>
    //         <span>مدة المسار: سنة واحدة</span>
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <span className="material-icons rounded-full bg-teal-900 p-2">
    //           menu_book
    //         </span>
    //         <span>مقدار المراجعة اليومية: أربعة - خمسة أجزاء</span>
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <span className="material-icons rounded-full bg-teal-900 p-2">
    //           school
    //         </span>
    //         <span>شرط التسجيل: التخرج من مسار الإتقان</span>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="mt-4 flex gap-4 md:mt-0">
    //     <button className="rounded-lg bg-teal-800 px-4 py-2 text-white hover:bg-teal-900">
    //       تفاصيل أكثر للرجال
    //     </button>
    //     <button className="rounded-lg bg-teal-800 px-4 py-2 text-white hover:bg-teal-900">
    //       تفاصيل أكثر للنساء
    //     </button>
    //   </div>
    // </div>
  );
};

export default PathwayCard;
