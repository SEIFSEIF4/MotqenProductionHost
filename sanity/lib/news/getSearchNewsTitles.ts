import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
type NewsItem = {
  title: string | null;
  slug: { current: string | null };
  image: { asset: { url: string | null } | null };
  shortDescription: string | null;
};

export async function searchNewsTitles(
  searchQuery: string,
): Promise<NewsItem[]> {
  const ALL_NewsTitles_QUERY = defineQuery(
    `*[_type == "news" && title match $searchQuery] | order(title desc)[0...10] {
  title,
  slug,
  shortDescription,
  image {
    asset -> {
      url
    }
  }
  }`,
  );

  try {
    // Fetch the data from the Sanity API
    const response = await sanityFetch({
      query: ALL_NewsTitles_QUERY,
      params: { searchQuery },
    });

    return (
      response.data.map((item: any) => ({
        title: item.title || "",
        slug: { current: item.slug?.current || "" },
        image: item.image?.asset?.url || "",
        shortDescription: item.shortDescription || "",
      })) || []
    );
  } catch (error) {
    console.error("Error fetching news titles:", error);
    return [];
  }
}
