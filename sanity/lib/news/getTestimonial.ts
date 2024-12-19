import { sanityFetch } from "../live";
import { defineQuery } from "next-sanity";
import { querySanity } from "@/lib/queryWrapper";
import { Testimonial } from "@/sanity.types";

export const getTestimonial = (limit: number = 5) =>
  querySanity<Testimonial>({
    query: `*[_type == "testimonial"] | order(_createdAt desc)[0...${limit}] {_id,text,name,position}`,
    cache: {
      revalidate: 60 * 60, // 1-hour cache
      tags: ["Testimonial"],
    },
  });

// For typegen
// export const getTestimonial = async (limit: number = 5) => {
//   const ALL_News_QUERY = defineQuery(
//     `*[_type == "testimonial"] | order(_createdAt desc)[0...${limit}] {_id,text,name,position}`,
//   );
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
