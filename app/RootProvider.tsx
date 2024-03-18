'use client'
// providers
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StoreProvider from './StoreProvider';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

interface RootProviderProps {
  children: React.ReactNode;
}
export default function RootProvider({ children }: RootProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <SessionProvider>{children}</SessionProvider>
      </StoreProvider>
    </QueryClientProvider>
  );
}