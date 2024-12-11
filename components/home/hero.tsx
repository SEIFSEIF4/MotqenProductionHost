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

export const NUMBER_OF_SLIDES = 3;

export const homeBookCovers = [
  {
    title: "أهمية اللاقراءة: مراجعة لكتاب كيف تتحدث عن كتاب لم تقرأه؟",
    author: "نجيب غلاء سمير أنس ",
    img: "../../public/Images/book-cover/home-book-1.jpg",
    slug: "book-not-read",
  },
  {
    title:
      'صراع اللغة والهوية والوجود: مُراجعة لكتاب "اللغة العربية في ساحات الوغى".',
    author: "غلاء سمير أنس ",
    img: "../../public/Images/book-cover/home-book-3.jpeg",
    slug: "allughat-walwujud",
  },
  {
    title: "السر وراء بناء العادات: مراجعة لكتاب العادات الذريّة",
    author: "إيمان علي حسين",
    img: "../../public/Images/book-cover/home-book-2.jpg",
    slug: "atomic-standards",
  },
];

import BookCarouselImg from "@/images/hero-2.png";

const Hero = () => {
  return (
    <SectionWrapper id="hero" className="relative">
      <Carousel
        className={cn("w-full")}
        carouselOptions={{
          loop: true,
          dragFree: false,
          align: "center",
          direction: "ltr",
        }}
      >
        <div className="relative">
          <CarouselMainContainer className="h-[400px]">
            {homeBookCovers.map((book, index) => (
              <SliderMainItem key={index} className="bg-transparent">
                <div className="relative flex h-full items-center justify-center rounded-xl bg-background outline outline-1 outline-border">
                  <Link href={`${book.slug}`}>
                    <Image
                      src={BookCarouselImg}
                      width={500}
                      height={700}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                </div>
                <div className="absolute bottom-0 flex w-full flex-col bg-gradient-to-t from-[#22414dc2] to-[#22414D] p-7 text-right"></div>
                <div className="">
                  <Link href={`${book.slug}`}>
                    <h3 className="py-2 text-xl text-white">{book.title}</h3>
                  </Link>
                  <p className="p-2 text-lg font-normal text-white">
                    {book.author}
                  </p>
                </div>
              </SliderMainItem>
            ))}
          </CarouselMainContainer>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
            <CarouselThumbsContainer className="gap-x-1">
              {homeBookCovers.map((_, index) => (
                <CarouselIndicator
                  className="bg-mainColor mx-1 h-3 w-3 rounded-full"
                  key={index}
                  index={index}
                />
              ))}
            </CarouselThumbsContainer>
          </div>
        </div>
      </Carousel>
    </SectionWrapper>
  );
};

export default Hero;
