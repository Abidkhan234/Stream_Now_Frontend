"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

const QueryProvider = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Keep data fresh for 2 minutes
            staleTime: 2 * 60 * 1000,

            // Cache data for 10 minutes before garbage collection
            cacheTime: 10 * 60 * 1000,

            // Do not refetch data when window regains focus
            refetchOnWindowFocus: false,

            // Do not refetch data on mount if it's still fresh
            refetchOnMount: false,

            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
