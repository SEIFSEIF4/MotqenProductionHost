import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";

import BookCarouselImg from "@/images/hero-4.jpg";
import { HERO_CAROUSEL_FIXED_HEIGHT } from "@/constant/common";
import { HomeIcons } from "@/components/icons";
import ClientButton from "@/components/ClientGoProgramsButton";
import { useLocale, useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("HomePage.HeroSection");
  const locale = useLocale();

  return (
    <section id="hero" className="w-full">
      <Carousel
        className={cn("w-full")}
        carouselOptions={{
          autoplay: true,
          active: true,
          loop: true,
          dragFree: false,
          align: "center",
          direction: "rtl",
        }}
      >
        <CarouselMainContainer
          style={{ height: HERO_CAROUSEL_FIXED_HEIGHT }}
          className="relative h-full"
        >
          {[1, 2, 3, 4].map((_, index) => (
            <SliderMainItem key={index} className="relative h-full">
              <div
                className="absolute inset-0 z-10 bg-gradient-to-l from-[rgba(22,92,103,1)] duration-300 group-hover:rounded-3xl"
                aria-hidden="true"
              />
              <HomeIcons.Carousel className="absolute top-0 z-10 max-w-[50%] md:max-w-full ltr:right-0 rtl:right-0" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(11,70,79,0.4)] via-transparent to-[rgba(11,70,79,0.4)]" />
              <div
                className={`content absolute top-0 z-20 flex h-full max-w-full flex-col justify-center gap-y-3 p-20 text-white lg:max-w-[50%] ${locale === "ar" ? "right-0 items-start text-right" : "left-0 items-end text-left"}`}
              >
                <h1 className="text-5xl font-semibold md:text-6xl">
                  {t("title")}
                </h1>
                <p className="text-2xl font-medium md:text-3xl">
                  {t("description")}
                </p>
                <ClientButton title={t("button")} />
              </div>
              <Image
                fill
                priority
                src={BookCarouselImg}
                alt={"alt"}
                sizes="(max-width: 1440px) 100vw, 1440px"
                quality={80} // Maybe lower quality for performance
                style={{
                  objectFit: "cover",
                }}
                className="h-full w-full bg-[rgba(11,70,79,0.4)]"
              />
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
        <CarouselThumbsContainer containerClassName="absolute bottom-10 left-1/2  transform -translate-x-1/2 -translate-y-1/2">
          {[1, 2, 3, 4].map((_, index) => (
            <CarouselIndicator
              className="mx-1 data-[active='false']:bg-[rgba(229,231,235,0.2)] data-[active='true']:bg-white"
              key={index}
              index={index}
            />
          ))}
        </CarouselThumbsContainer>
      </Carousel>
    </section>
  );
};

export default Hero;
