import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production", // use CDN in production
  token: process.env.SANITY_READ_TOKEN, // optional
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
