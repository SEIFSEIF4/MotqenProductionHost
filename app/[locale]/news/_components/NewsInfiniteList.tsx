"use client";

import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoaderCircle } from "lucide-react";
import { NewsCard } from "./NewsCard";
import { useInfiniteNews } from "@/hooks/useInfiniteNews";
import type { NewsItem } from "@/hooks/useNews";

interface NewsInfiniteListProps {
  initialData: NewsItem[];
  locale: string;
  buttonText: string;
  PAGE_SIZE: number;
  NoMoreNews?: string;
}

export default function NewsInfiniteList({
  initialData,
  locale,
  buttonText,
  PAGE_SIZE,
  NoMoreNews,
}: NewsInfiniteListProps) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteNews({
    locale,
    pageSize: PAGE_SIZE,
    initialData,
  });

  const allNews = data?.pages.flatMap((page) => page) ?? [];

  if (status === "error") {
    return (
      <div className="w-full py-4 text-center text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (isFetching && !allNews.length) {
    return (
      <div className="w-full py-4 text-center">
        <LoaderCircle className="text-primary-500 h-8= mx-auto w-8 animate-spin" />
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={allNews.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={
        <div className="w-full py-4 text-center">
          <LoaderCircle className="text-primary-500 h-8 w-8 animate-spin" />
        </div>
      }
      // endMessage={
      //   <div className="w-full py-4 text-center text-gray-500 md:text-start">
      //     {NoMoreNews ?? "لا يوجد مزيد من الأخبار"}
      //   </div>
      // }
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
