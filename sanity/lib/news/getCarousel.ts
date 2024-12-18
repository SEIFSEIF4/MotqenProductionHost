import { sanityFetch } from "../live";
import { defineQuery } from "next-sanity";
import { querySanity } from "@/lib/queryWrapper";
import { Carousel } from "@/sanity.types";

export const getCarousel = (limit: number = 5) =>
  querySanity<Carousel>({
    query: `*[_type == "carousel"] | order(_createdAt desc)[0...${limit}] {
  _id,
  title,
  description,
  buttonUrl,
  image {
    asset -> {
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    }
  }
}`,
    cache: {
      revalidate: 60 * 60, // 1-hour cache
      tags: ["Carousel"],
    },
    transformResults: (data) =>
      data.map((item) => ({
        ...item,
        imageUrl: item.image?.asset?.url || "", // Fallback to empty string
      })),
  });

// For typegen
// export const getAllNews = async (limit: number = 5) => {
//   const ALL_News_QUERY = defineQuery(`
// *[_type == "carousel"] | order(_createdAt desc)[0...${limit}] {
//       _id,
//       title,
//       description,
//       buttonUrl,
//       image {
//         asset -> {
//           url,
//           metadata {
//             dimensions {
//               width,
//               height
//             }
//           }
//         }
//       }
//     }`);
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
