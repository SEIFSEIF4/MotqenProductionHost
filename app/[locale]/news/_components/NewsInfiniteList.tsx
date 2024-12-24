"use client";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoaderCircle } from "lucide-react";
import { NewsCard } from "./NewsCard";
import { fetchNews, subNews } from "@/sanity/lib/news/getClientNews";

interface NewsInfiniteListProps {
  initialData: subNews[];
  locale: string;
  buttonText: string;
}

export default function NewsInfiniteList({
  initialData,
  locale,
  buttonText,
}: NewsInfiniteListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["newsPage"],
      queryFn: () => fetchNews(6),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        if (lastPage.length < 6) return undefined;
        return lastPage.length ? nextPage : undefined;
      },
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
      initialPageParam: 1,
    });

  const allNews = data?.pages.flat() ?? [];

  return (
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
