import { ComponentType, LazyExoticComponent, lazy } from "react";
import { NextComponentType, NextPageContext } from "next";

// Enhanced type for Next.js dynamic imports
export type NextDynamicImport<P = object> = () => Promise<{
  default: NextComponentType<NextPageContext, never, P>;
}>;

/**
 * Next.js Specific Module Preloader
 */
export class NextModulePreloader {
  // Cache for preloaded modules and components
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static preloadedModules: Map<string, any> = new Map();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static preloadPromises: Map<string, Promise<any>> = new Map();

  /**
   * Preload a Next.js page or component module
   * @param importFn - Dynamic import function for the module
   * @param options - Preloading configuration
   * @returns Preloaded module or component
   */
  static preloadModule<T = never>(
    importFn: () => Promise<{ default: T }>,
    options: NextModulePreloadOptions = {}
  ): Promise<NextPreloadResult<T>> {
    const {
      timeout = 10000,
      forceReload = false,
      onProgress,
      onError,
    } = options;

    // Generate a unique key for the import function
    const moduleKey = importFn.toString();

    // Check cache and return if already loaded
    if (!forceReload && this.preloadedModules.has(moduleKey)) {
      return Promise.resolve({
        module: this.preloadedModules.get(moduleKey),
        fromCache: true,
      });
    }

    // Prevent duplicate preloading
    if (this.preloadPromises.has(moduleKey)) {
      return this.preloadPromises.get(moduleKey)!;
    }

    // Create preload promise
    const preloadPromise = new Promise<NextPreloadResult<T>>(
      (resolve, reject) => {
        // Set timeout
        const timeoutId = setTimeout(() => {
          const error: NextPreloadError = new Error(
            `Preload timeout for module`
          );
          error.code = "PRELOAD_TIMEOUT";
          reject(error);
        }, timeout);

        // Attempt to import
        importFn()
          .then((moduleImport) => {
            clearTimeout(timeoutId);

            // Store in cache
            this.preloadedModules.set(moduleKey, moduleImport.default);

            // Resolve with module
            resolve({
              module: moduleImport.default,
              fromCache: false,
              timestamp: Date.now(),
            });

            // Progress callback
            onProgress?.({ status: "loaded" });
          })
          .catch((error) => {
            clearTimeout(timeoutId);

            // Standardize error
            const preloadError: NextPreloadError =
              error instanceof Error
                ? error
                : new Error("Failed to preload module");
            preloadError.code = "PRELOAD_FAILED";

            // Call error handler
            onError?.(preloadError);

            // Reject promise
            reject(preloadError);
          })
          .finally(() => {
            // Remove from ongoing promises
            this.preloadPromises.delete(moduleKey);
          });
      }
    );

    // Store promise to prevent duplicates
    this.preloadPromises.set(moduleKey, preloadPromise);

    return preloadPromise;
  }

  /**
   * Create a lazy-loaded Next.js component with built-in preloading
   * @param importFn - Dynamic import function
   * @returns LazyExoticComponent for use in Next.js routing
   */
  static createLazyComponent<P = object>(
    importFn: NextDynamicImport<P>
  ): LazyExoticComponent<NextComponentType<NextPageContext, never, P>> {
    // Preload the module immediately
    this.preloadModule(importFn);

    // Create lazy component
    return lazy(importFn as () => Promise<{ default: ComponentType<P> }>);
  }

  /**
   * Batch preload multiple modules
   * @param importFns - Array of import functions
   * @param options - Preloading configuration
   */
  static async batchPreload<T = never>(
    importFns: Array<() => Promise<{ default: T }>>,
    options: NextModulePreloadOptions = {}
  ): Promise<NextPreloadResult<T>[]> {
    const { concurrent = true, maxConcurrent = 3 } = options;

    if (concurrent && importFns.length > maxConcurrent) {
      // Implement batched concurrent preloading
      const batches: Array<() => Promise<{ default: T }>>[] = [];
      for (let i = 0; i < importFns.length; i += maxConcurrent) {
        batches.push(importFns.slice(i, i + maxConcurrent));
      }

      const results: NextPreloadResult<T>[] = [];
      for (const batch of batches) {
        const batchResults = await Promise.all(
          batch.map((importFn) => this.preloadModule(importFn, options))
        );
        results.push(...batchResults);
      }

      return results;
    }

    // Standard concurrent preloading
    return Promise.all(
      importFns.map((importFn) => this.preloadModule(importFn, options))
    );
  }

  /**
   * Clear preloaded module cache
   * @param importFn - Optional specific import function to clear
   */
  static clearCache(importFn?: () => Promise<{ default: never }>): void {
    if (importFn) {
      const moduleKey = importFn.toString();
      this.preloadedModules.delete(moduleKey);
    } else {
      this.preloadedModules.clear();
    }
  }
}

// Utility Interfaces and Types
export interface NextModulePreloadOptions {
  timeout?: number;
  forceReload?: boolean;
  concurrent?: boolean;
  maxConcurrent?: number;
  onProgress?: (progress: { status: "loading" | "loaded" }) => void;
  onError?: (error: NextPreloadError) => void;
}

export interface NextPreloadResult<T = never> {
  module: T;
  fromCache: boolean;
  timestamp?: number;
}

export interface NextPreloadError extends Error {
  code?: string;
}

// Convenience exports
export const preloadModule = NextModulePreloader.preloadModule;
export const createLazyComponent = NextModulePreloader.createLazyComponent;
export const batchPreload = NextModulePreloader.batchPreload;
