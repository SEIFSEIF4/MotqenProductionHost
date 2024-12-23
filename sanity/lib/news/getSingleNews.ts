import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { SingleNewsQueryResult } from "@/sanity.types";

export const getSingleNews = async (slug: string) => {
  const SingleNewsQuery = defineQuery(`
    *[_type == "news" && slug.current == $slug][0] {
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
      socialLinks {
        instagram,
        whatsapp,
        twitter,
        linkedin
      }
    }
  `);
  try {
    const news = await sanityFetch({
      query: SingleNewsQuery,
      params: { slug },
    });
    return (news.data as SingleNewsQueryResult) || [];
  } catch (error) {
    console.error("Error fetching all news", error);
    return [];
  }
};
