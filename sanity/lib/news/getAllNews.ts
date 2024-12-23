import { sanityFetch } from "../live";
import { defineQuery } from "next-sanity";

// For typegen
export const getAllNews = async () => {
  const NewsQUERY = defineQuery(`
    *[_type == "news"] | order(_createdAt desc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      slug,
      shortDescription,
      content,
      image {
        asset -> {
          url
        }
      },
      datePublished,
      socialLinks
    }
  `);
  try {
    const news = await sanityFetch({
      query: NewsQUERY,
    });
    return news.data || [];
  } catch (error) {
    console.error("Error fetching all news", error);
    return [];
  }
};
