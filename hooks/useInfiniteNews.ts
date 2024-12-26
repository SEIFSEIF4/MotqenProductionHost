"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { client } from "@/sanity/lib/client";
import { NewsItem } from "./useNews";

interface UseInfiniteNewsProps {
  locale: string;
  pageSize: number;
  initialData: NewsItem[];
}

export function useInfiniteNews({
  locale,
  pageSize,
  initialData,
}: UseInfiniteNewsProps) {
  return useInfiniteQuery({
    queryKey: ["infinite-news", locale],
    queryFn: async ({ pageParam = 1 }) => {
      const skip = (pageParam - 1) * pageSize;
      const query = `
        *[_type == "news"] | order(_createdAt desc) [${skip}...${skip + pageSize}] {
          _id,
          image {
            asset -> {
              url
            }
          },
          title,
          slug,
          shortDescription,
        }
      `;
      const news = await client.fetch<NewsItem[]>(query);

      if (!news) {
        throw new Error("Failed to fetch news");
      }

      return news;
    },
    getNextPageParam: (lastPage, allPages) => {
      const hasNextPage = lastPage.length === pageSize;
      return hasNextPage ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
  });
}
