"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
} from "@/components/ui/carousel";
import { HERO_CAROUSEL_FIXED_HEIGHT } from "@/constant/common";

import { HomeIcons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import useQueryCarousel from "@/hooks/useQueryCarousel";
import { CarouselWithUrl } from "@/sanity/lib/news/getCarousel";

export default function Hero({
  locale,
  initialCarousel,
}: {
  locale: string;
  initialCarousel: CarouselWithUrl[];
}) {
  const { data: CarouselSlides } = useQueryCarousel({
    locale,
    initialCarousel,
  });

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
          {CarouselSlides?.map((slide, index) => (
            <SliderMainItem key={index} className="relative h-full">
              <div
                className={`absolute inset-0 z-10 ${locale === "ar" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-[rgba(22,92,103,1)] duration-300 group-hover:rounded-3xl`}
                aria-hidden="true"
              />
              <HomeIcons.Carousel
                className={`absolute top-0 z-10 max-w-[50%] md:max-w-full ${locale === "ar" ? "right-0" : "left-0 -scale-x-100"}`}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(11,70,79,0.4)] via-transparent to-[rgba(11,70,79,0.4)]" />
              <div
                className={`content absolute top-0 z-20 flex h-full max-w-full flex-col justify-center gap-y-3 p-20 text-white lg:max-w-[50%] ${locale === "ar" ? "right-0 items-start text-right" : "left-0 items-end text-left"}`}
              >
                <h1 className="text-5xl font-semibold md:text-6xl">
                  {slide.title}
                </h1>
                <p className="text-2xl font-medium md:text-3xl">
                  {slide.description}
                </p>
                {slide.buttonUrl && (
                  <a
                    href={slide.buttonUrl}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "text-black",
                    )}
                  >
                    {slide.buttonText}
                  </a>
                )}
              </div>
              <Image
                fill
                priority
                src={slide.image.asset?.url || ""}
                alt={slide.title || "Hero Image"}
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 1440px"
                quality={60} // Increased quality slightly for better hero visuals
                style={{
                  objectFit: "cover",
                }}
                className="h-full w-full"
              />
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
        <CarouselThumbsContainer containerClassName="absolute bottom-14 left-1/2  transform -translate-x-1/2 -translate-y-1/2">
          {CarouselSlides?.map((_, index) => (
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
}
