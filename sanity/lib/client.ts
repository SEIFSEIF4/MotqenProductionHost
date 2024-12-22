import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_READ_TOKEN,
  // Add perspective to handle draft content in preview mode
  perspective:
    (process.env.NEXT_PUBLIC_SANITY_PERSPECTIVE as
      | "raw"
      | "previewDrafts"
      | "published") || "published", // 'raw' | 'previewDrafts' | 'published'
  // Add stega to help with preview mode
  stega: {
    enabled: process.env.NODE_ENV === "development",
    studioUrl: "/studio",
  },
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
