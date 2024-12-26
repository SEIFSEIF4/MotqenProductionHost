"use client";

import { useQuery } from "@tanstack/react-query";
import { client } from "@/sanity/lib/client";
import { getInfiniteNews } from "@/sanity/lib/news/getInfiniteNews";

export interface NewsItem {
  _id: string;
  image: {
    asset: {
      url: string;
    };
  };
  title: string;
  slug: string;
  shortDescription: string;
  imageUrl: string;
}

export function useNews(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["news", page, pageSize],
    queryFn: async () => {
      const skip = (page - 1) * pageSize;
      const data = await client.fetch<NewsItem[]>(
        getInfiniteNews(skip, pageSize),
      );
      if (!data || data.length === 0) {
        throw new Error("No news available");
      }
      return data;
    },
  });
}
