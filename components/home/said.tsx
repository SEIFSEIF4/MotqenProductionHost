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
import { useTranslations } from "next-intl";
import { SubTitle } from "@/components/ui/heading";
import { SAID_FIXED_HEIGHT } from "@/constant/common";
import { HomeIcons } from "@/components/icons";

export const NUMBER_OF_SLIDES = 3;
export const SaidDummyData = [
  {
    title:
      "جمعية متقن تقدم نموذجًا متميزًا في تعليم القرآن الكريم، مستفيدة من أفضل الأساليب الحديثة لتحقيق رسالتها السامية.",
    author: "د.أحمد صالح",
    subTitle: "دكتور دراسات إسلامية",
  },
  {
    title:
      "جمعية متقن تقدم نموذجًا متميزًا في تعليم القرآن الكريم، مستفيدة من أفضل الأساليب الحديثة لتحقيق رسالتها السامية.",
    author: "د.أحمد صالح",
    subTitle: "دكتور دراسات إسلامية",
  },
  {
    title:
      "جمعية متقن تقدم نموذجًا متميزًا في تعليم القرآن الكريم، مستفيدة من أفضل الأساليب الحديثة لتحقيق رسالتها السامية.",
    author: "د.أحمد صالح",
    subTitle: "دكتور دراسات إسلامية",
  },
] as const;

const Said = () => {
  const t = useTranslations("HomePage.SaidSections");
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
          {SaidDummyData.map((item, index) => (
            <SliderMainItem
              key={index}
              className="flex-shrink-0 flex-grow-0 basis-full bg-transparent"
            >
              <div className="relative mx-auto flex h-full w-[85%] flex-col items-start justify-center rounded-xl text-start md:w-1/2">
                <h2 className="relative text-xl md:text-3xl">
                  {item.title}
                  <HomeIcons.Quotes className="absolute -right-6 top-0 -z-10" />
                </h2>
                <p className="mt-4 text-lg font-bold">{item.author}</p>
                <span className="text-[#999EA7]">{item.subTitle}</span>
              </div>
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
          <CarouselThumbsContainer className="gap-x-1">
            {SaidDummyData.map((_, index) => (
              <CarouselIndicator className="mx-1" key={index} index={index} />
            ))}
          </CarouselThumbsContainer>
        </div>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </SectionWrapper>
  );
};

export default Said;
