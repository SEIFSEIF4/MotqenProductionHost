import { querySanity } from "@/lib/queryWrapper";

export const getAllNews = (limit: number = 3) =>
  querySanity({
    query: `*[_type == "news"] | order(_createdAt desc)[0...${limit}] {
      _id,
      title,
      slug,
      // Add any other fields you want
    }`,
    cache: {
      revalidate: 180, // 3-minute cache
      tags: ["groupedNews"],
    },
    transformResults: (data) =>
      data.map((item) => ({
        ...item,
        // Add any transformations if needed
        slug: item.slug?.current || item._id,
      })),
  });
