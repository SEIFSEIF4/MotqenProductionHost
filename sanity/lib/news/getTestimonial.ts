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
