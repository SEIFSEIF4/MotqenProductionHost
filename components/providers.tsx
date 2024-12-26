"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import ScrollToTop from "react-scroll-to-top";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5, // 5 minutes
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
        <ProgressBar
          height="4px"
          color="#165e69"
          delay={60}
          disableSameURL
          options={{ showSpinner: false }}
          shallowRouting
        />
        <ScrollToTop
          smooth
          color="#165e69"
          className="fixed flex items-center justify-center"
        />
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
