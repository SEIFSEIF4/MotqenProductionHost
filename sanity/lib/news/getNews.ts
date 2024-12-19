import { querySanity } from "@/lib/queryWrapper";

export const getNews = (limit: number = 3) =>
  querySanity({
    query: `*[_type == "news"] | order(_createdAt desc)[0...${limit}] {
      _id,
      image,
      title,
      slug,
      shortDescription,
    }`,
    cache: {
      revalidate: 180, // 3-minute cache
      tags: ["groupedNews"],
    },
    transformResults: (data) =>
      data.map((item) => ({
        ...item,
        imageUrl: item.image?.asset?.url || "",
        slug: item.slug?.current || item._id,
      })),
  });
