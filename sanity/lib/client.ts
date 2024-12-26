import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token: process.env.NEXT_PUBLIC_SANITY_READ_TOKEN,
  // Add perspective to handle draft content in preview mode
  // perspective:
  //   (process.env.NEXT_PUBLIC_SANITY_PERSPECTIVE as
  //     | "raw"
  //     | "previewDrafts"
  //     | "published") || "published", // 'raw' | 'previewDrafts' | 'published'
  perspective: "published",
  stega: {
    enabled: process.env.NODE_ENV === "development",
    studioUrl: "/studio",
  },
  ignoreBrowserTokenWarning: true, // Disable the warning in the browser console
});

export async function testSanityConnection(query: string) {
  try {
    const result = await client.fetch(query);
    console.log("Sanity connection test:", result);
    return result;
  } catch (error) {
    console.error("Sanity connection error:", error);
    throw error;
  }
}
