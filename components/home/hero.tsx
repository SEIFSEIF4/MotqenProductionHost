import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SectionWrapper } from "@/components/Wrapper";

import BookCarouselImg from "@/images/hero-4.jpg";
import { HERO_CAROUSEL_FIXED_HEIGHT } from "@/constant/common";
import { HomeIcons } from "@/components/icons";

const Hero = () => {
  return (
    <section id="hero" className="w-full">
      <Carousel
        className={cn("w-full")}
        carouselOptions={{
          // autoplay: true,
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
          {[1, 2, 3].map((_, index) => (
            <SliderMainItem key={index} className="relative h-full">
              <div
                className="absolute inset-0 z-10 bg-gradient-to-l from-[rgba(22,92,103,1)] duration-300 group-hover:rounded-3xl"
                aria-hidden="true"
              />
              <HomeIcons.Carousel className="absolute top-0 z-10 max-w-[50%] md:max-w-full ltr:right-0 rtl:right-0" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(11,70,79,0.4)] via-transparent to-[rgba(11,70,79,0.4)]" />
              <Image
                fill
                priority
                src={BookCarouselImg}
                alt={"alt"}
                sizes="100vw"
                quality={100} // Maybe lower quality for performance
                style={{
                  objectFit: "cover",
                }}
                className="h-full w-full bg-[rgba(11,70,79,0.4)]"
              />
            </SliderMainItem>
          ))}
          <CarouselThumbsContainer className="CarouselThumbsContainer">
            {[1, 2, 3].map((_, index) => (
              <CarouselIndicator
                className="bg-mainColor mx-1 h-3 w-3 rounded-full"
                key={index}
                index={index}
              />
            ))}
          </CarouselThumbsContainer>
        </CarouselMainContainer>
      </Carousel>
    </section>
  );
};

export default Hero;
