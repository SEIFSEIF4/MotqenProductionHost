import { querySanity } from "@/lib/queryWrapper";
import { News } from "@/sanity.types";

export const getAllNews = () =>
  querySanity<News>({
    query: `*[_type == "news"] | order(_createdAt desc) {
      _id, 
      title, 
      slug,
      // Add any other fields you want
    }`,
    cache: {
      revalidate: 180, // 3-minute cache
      tags: ["news"],
    },
    transformResults: (data) =>
      data.map((item) => ({
        ...item,
        // Add any transformations if needed
        slug: item.slug?.current || item._id,
      })),
  });

// For typegen
// export const getAllNews = async () => {
//   const ALL_News_QUERY = defineQuery(`
//     *[_type == "news"]|order(name asc)
//     `);
//   try {
//     const news = await sanityFetch({
//       query: ALL_News_QUERY,
//     });
//     return news.data || [];
//   } catch (error) {
//     console.error("Error fetching all categories", error);
//     return [];
//   }
// };
