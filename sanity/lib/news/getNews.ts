import { querySanity } from "@/lib/queryWrapper";
import type { NewsItem } from "@/hooks/useNews";

export const getNews = (limit: number = 3, excludeSlug?: string) =>
  querySanity<NewsItem>({
    query: `
      *[_type == "news"${excludeSlug ? ` && slug.current != $excludeSlug` : ""}] 
      | order(_createdAt desc)[0...${limit}] {
        _id,
        image{
          asset->{
            url
            }
            },
        title,
        slug,
        shortDescription,
      }
    `,
    params: excludeSlug ? { excludeSlug } : {},
    cache: {
      revalidate: 180, // 3-minute cache
      tags: ["groupedNews"],
    },
    transformResults: (data) =>
      data.map((item) => ({
        ...item,
        imageUrl: item.image?.asset?.url || "",
        slug:
          typeof item.slug === "string"
            ? item.slug
            : item.slug?.current || item._id,
      })),
  });
