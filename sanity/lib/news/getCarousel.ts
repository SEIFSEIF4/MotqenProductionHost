import { querySanity } from "@/lib/queryWrapper";
import { Carousel } from "@/sanity.types";

export type CarouselWithUrl = Carousel & {
  image: {
    asset?: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
};

export const getCarousel = (limit: number = 5) =>
  querySanity<CarouselWithUrl>({
    query: `*[_type == "carousel"] | order(_createdAt desc)[0...${limit}] {
  _id,
  title,
  description,
  buttonUrl,
  buttonText,
  image {
    asset -> {
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    }
  }
}`,
    cache: {
      revalidate: 60 * 60, // 1-hour cache
      tags: ["Carousel"],
    },
    transformResults: (data) =>
      data.map((item) => ({
        ...item,
        imageUrl: item.image?.asset?.url || "", // Fallback to empty string
      })),
  });
