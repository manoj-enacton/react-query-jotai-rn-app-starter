import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as JotaiProvider } from 'jotai'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

// ─── QueryClient — global defaults ────────────────────────────────────────────
// Per-hook defaults override these. Call-site options override per-hook defaults.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000,    // 1 min default stale time
      gcTime: 5 * 60 * 1000,       // 5 min garbage collection
      retry: 2,                     // retry failed requests twice
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
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          {children}
          <Toast />
        </SafeAreaProvider>
      </QueryClientProvider>
    </JotaiProvider>
  )
}
