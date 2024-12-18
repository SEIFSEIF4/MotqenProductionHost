import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllNews = async () => {
  const ALL_News_QUERY = defineQuery(`
    *[_type == "news"]|order(name asc)
    `);
  try {
    const news = await sanityFetch({
      query: ALL_News_QUERY,
    });
    return news.data || [];
  } catch (error) {
    console.error("Error fetching all categories", error);
    return [];
  }
};
