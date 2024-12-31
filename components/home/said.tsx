"use client";

import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "@/components/Wrapper";
import { SubTitle } from "@/components/ui/heading";
import { SAID_FIXED_HEIGHT } from "@/constant/common";
import { HomeIcons } from "@/components/icons";
import { useTranslations } from "next-intl";
import useQuerySaid from "@/hooks/useQuerySaid";
import { type Testimonial } from "@/sanity.types";

export default function Said({
  locale,
  initialSaidItems,
}: {
  locale: string;
  initialSaidItems: Testimonial[];
}) {
  const t = useTranslations("HomePage.SaidSections");
  const { data: saidItems } = useQuerySaid({
    locale: locale,
    initialSaidItems,
  });

  return (
    <SectionWrapper id="said">
      <SubTitle text={t("title")} />
      <Carousel
        className={cn("mt-4 w-full")}
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
          className="h-[345]"
          style={{
            height: SAID_FIXED_HEIGHT,
            width: "100%",
          }}
        >
          {saidItems?.map((item, index) => (
            <SliderMainItem
              key={index}
              className="flex-shrink-0 flex-grow-0 basis-full bg-transparent"
            >
              <div className="relative mx-auto flex h-full w-[85%] flex-col items-start justify-center rounded-xl text-start md:w-1/2">
                <h2 className="relative text-xl md:text-3xl">
                  {item.text}
                  <HomeIcons.Quotes className="absolute -right-6 top-0 -z-10" />
                </h2>
                <p className="mt-4 text-lg font-bold">{item.name}</p>
                <span className="text-[#999EA7]">{item.position}</span>
              </div>
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
          <CarouselThumbsContainer className="gap-x-1">
            {saidItems?.map((_, index) => (
              <CarouselIndicator className="mx-1" key={index} index={index} />
            ))}
          </CarouselThumbsContainer>
        </div>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </SectionWrapper>
  );
}
