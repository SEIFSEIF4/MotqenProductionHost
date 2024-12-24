import { client } from "../client";
import type { News, Slug } from "@/sanity.types";

export interface subNews extends Omit<News, "slug"> {
  imageUrl: string;
  slug: Slug | string;
  _id: string;
  title: string;
}

export const fetchNews = async (limit: number = 3, excludeSlug?: string) => {
  const query = `
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
  `;

  const params = excludeSlug ? { excludeSlug } : {};

  try {
    const results = await client.fetch<subNews[]>(query, params);
    return results.map((item) => ({
      ...item,
      // @ts-expect-error - image is optional
      imageUrl: item.image?.asset?.url || "",
      slug:
        typeof item.slug === "string"
          ? item.slug
          : item.slug?.current || item._id,
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
