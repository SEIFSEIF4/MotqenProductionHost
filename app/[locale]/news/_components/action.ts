"use server";
import { getNews } from "@/sanity/lib/news/getNews";

export async function fetchNewsPage(page: number) {
  return getNews(6, undefined);
}
