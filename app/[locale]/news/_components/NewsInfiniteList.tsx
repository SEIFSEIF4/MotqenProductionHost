"use client";

import React from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoaderCircle } from "lucide-react";
import { NewsCard } from "./NewsCard";
import { subNews } from "@/sanity/lib/news/getClientNews";
import { client } from "@/sanity/lib/client";

interface NewsInfiniteListProps {
  initialData: subNews[];
  locale: string;
  buttonText: string;
  PAGE_SIZE: number;
}

const fetchNews = async (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;
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
  const News = await client.fetch(query);
  if (!News || News.length === 0) {
    console.error("No more news available.\nError fetching news: ", News);
  }
  return News;
};

export default function NewsInfiniteList({
  initialData,
  locale,
  buttonText,
  PAGE_SIZE,
}: NewsInfiniteListProps) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["news", { locale }],
    queryFn: ({ pageParam = 1 }) => fetchNews(pageParam, PAGE_SIZE),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined; // No more pages if the last page is smaller than `PAGE_SIZE`

      return allPages.length + 1; // Next page is the current count + 1
    },
    initialPageParam: 1,
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
  });

  const allNews = data?.pages?.flat() ?? [];

  return isFetching ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <InfiniteScroll
      dataLength={allNews.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={
        <div className="w-full py-4 text-center">
          {isFetchingNextPage ? (
            <LoaderCircle className="text-primary-500 h-8 w-8 animate-spin" />
          ) : (
            "Load more"
          )}
        </div>
      }
      className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3"
    >
      {allNews.map((newsItem) => (
        <NewsCard
          key={newsItem._id}
          newsItem={newsItem}
          locale={locale}
          buttonText={buttonText}
        />
      ))}
    </InfiniteScroll>
  );
}
