'use client';

import { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { CurrentUserProvider } from "./CurrentUserProvider";
import { AppsProvider } from "./AppsProvider";

const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <CurrentUserProvider>
          <AppsProvider>
            {children}
          </AppsProvider>
        </CurrentUserProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default Providers;