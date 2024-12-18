// sanity/lib/queryWrapper.ts
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../sanity/lib/live";

// Generic type for query parameters
type QueryParams = Record<string, string | number | boolean>;

// Configuration interface for query options
interface QueryConfig<T> {
  query: string;
  params?: QueryParams;
  transformResults?: (data: any[]) => T[];
  errorHandler?: (error: Error) => void;
  cache?: {
    revalidate?: number;
    tags?: string[];
  };
}

// Default error handler
const defaultErrorHandler = (error: Error) => {
  console.error("Sanity Query Error:", {
    message: error.message,
    stack: error.stack,
    name: error.name,
  });
};

// Default transform (identity function)
const defaultTransform = <T>(data: any[]): T[] => data as T[];

/**
 * Wrapper function for Sanity queries
 * @param config Configuration for the query
 * @returns Array of results or empty array
 */
export async function querySanity<T = any>(
  config: QueryConfig<T>,
): Promise<T[]> {
  // Destructure with defaults
  const {
    query,
    params = {},
    transformResults = defaultTransform,
    errorHandler = defaultErrorHandler,
    cache = { revalidate: 60 }, // Default 1-minute cache
  } = config;

  // Log tokens (optional, for debugging)
  if (!!process.env.SANITY_READ_TOKEN) {
  }
  console.log("Tokens:", {
    serverToken: !!process.env.SANITY_READ_TOKEN,
    browserToken: !!process.env.SANITY_READ_TOKEN,
  });

  // Define the query with optional parameters
  const sanityQuery = defineQuery(query);

  try {
    // Fetch data with optional cache configuration
    const result = await sanityFetch({
      query: sanityQuery,
      tag: cache.tags?.[0], // Use first tag if available
    });

    // Transform and return results
    return transformResults(result.data ?? []);
  } catch (error) {
    // Use custom or default error handler
    errorHandler(error as Error);
    return [];
  }
}
