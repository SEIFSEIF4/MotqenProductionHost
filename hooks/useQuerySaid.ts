"use client";

import { Testimonial } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { useQuery } from "@tanstack/react-query";

export default function useQuerySaid({ locale }: { locale: string }) {
  return useQuery<Testimonial[]>({
    queryKey: ["Testimonials", locale],
    queryFn: async () => {
      const query = `*[_type == "testimonial"] | order(_createdAt desc)[0...${5}] {_id,text,name,position}`;

      const testimonial = await client.fetch(query);

      if (!testimonial) {
        throw new Error("Failed to fetch testimonial");
      }

      return testimonial;
    },
    staleTime: 60 * 60, // 1-hour cache
  });
}
