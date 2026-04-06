import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Provider as JotaiProvider } from 'jotai'
import { jotaiStore } from '@/store/store'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

// ─── QueryClient — global defaults ────────────────────────────────────────────
// Per-hook defaults override these. Call-site options override per-hook defaults.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000,    // 1 min default stale time
      gcTime: 5 * 60 * 1000,       // 5 min garbage collection
      // Retry once for server errors — skip retry entirely for network/timeout errors.
      // Retrying when offline just doubles the wait time with no benefit.
      retry: (failureCount, error) => {
        const axiosError = error as AxiosError
        if (!axiosError.response) return false   // no response = offline/timeout → fail fast
        return failureCount < 1                   // server errors → retry once
      },
      refetchOnWindowFocus: false,  // RN has no window focus concept
    },
    mutations: {
      retry: 0,                     // don't auto-retry mutations
    },
  },
})

// ─── AppProviders ─────────────────────────────────────────────────────────────
// Wraps the entire app. Import once in App.tsx.

interface Props {
  children: ReactNode
}

export default function AppProviders({ children }: Props) {
  return (
    <JotaiProvider store={jotaiStore}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          {children}
          <Toast />
        </SafeAreaProvider>
      </QueryClientProvider>
    </JotaiProvider>
  )
}
