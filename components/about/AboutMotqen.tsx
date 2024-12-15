import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import About from "@/images/about-motqen.png";

const AboutMotqen = () => {
  const t = useTranslations("AboutMotqen");

  return (
    <>
      <div className="mx-auto my-10 max-w-7xl rounded-md bg-white p-4 shadow-md">
        <div className="flex flex-col-reverse gap-6 lg:flex-row-reverse">
          <div className="flex justify-center lg:w-1/3">
            <Image
              priority
              src={About}
              placeholder="blur"
              alt="Mentor Program"
              className="aspect-square rounded-md object-cover"
            />
          </div>

          <div className="mb-4 mt-4 flex flex-col justify-evenly md:text-2xl lg:mt-0 lg:w-2/3 lg:pl-6">
            <p className="text-justify leading-relaxed text-gray-800">
              {t("about")}
            </p>
            <p className="mt-4 text-justify leading-relaxed text-gray-800">
              {t("about2")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMotqen;
