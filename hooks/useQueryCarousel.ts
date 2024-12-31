"use client";

import { CarouselWithUrl } from "@/sanity/lib/news/getCarousel";
import { client } from "@/sanity/lib/client";
import { useQuery } from "@tanstack/react-query";

export default function useQueryCarousel({
  locale,
  initialCarousel,
}: {
  locale: string;
  initialCarousel: CarouselWithUrl[];
}) {
  return useQuery<CarouselWithUrl[]>({
    queryKey: ["HeroCarousel", locale],
    queryFn: async () => {
      const query = `*[_type == "carousel"] | order(_createdAt desc)[0...${5}] {
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
}`;
      const carousel = await client.fetch(query);

      if (!carousel) {
        throw new Error("Failed to fetch carousel");
      }

      return carousel;
    },
    initialData: initialCarousel,
    staleTime: 60 * 60, // 1-hour cache
  });
}
