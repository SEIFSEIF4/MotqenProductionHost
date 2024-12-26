import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { querySanity } from "@/lib/queryWrapper";

import { ALL_Slugs_QUERYResult as slugsType } from "@/sanity.types";

export const getAllNewsSlugs = async () => {
  const ALL_Slugs_QUERY = defineQuery(
    `*[_type == "news"] {
      "slug": slug.current
    }
  `,
  );
  try {
    const news = await sanityFetch({
      query: ALL_Slugs_QUERY,
    });
    return (news.data as slugsType) || [];
  } catch (error) {
    console.error("Error fetching all categories", error);
    return [];
  }
};
