import { querySanity } from "@/lib/queryWrapper";
import { News } from "@/sanity.types";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

// For typegen
export const getCategoryDocument = async (categoryFilter: string) => {
  const ALL_GovernanceDocument_QUERY = defineQuery(`
    *[_type == "governanceDocument" && category == $categoryFilter] {
      _id,
      category,
      title {
        ar,
        en
      },
      document {
        ar,
        en
      }
    } | order(_createdAt desc)
  `);

  try {
    const news = await sanityFetch({
      query: ALL_GovernanceDocument_QUERY,
      params: { categoryFilter },
    });
    return news.data || [];
  } catch (error) {
    console.error("Error fetching all categories", error);
    return [];
  }
};
