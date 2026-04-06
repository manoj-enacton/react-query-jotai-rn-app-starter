import { MMKV } from 'react-native-mmkv'

// Single MMKV instance for the entire app.
// Use this directly outside React (e.g. Axios interceptors).
// Inside React, prefer Jotai atoms backed by this storage.
export const storage = new MMKV({ id: 'app-storage' })

// Jotai-compatible MMKV storage adapter (used by atomWithMMKV)
export const mmkvStorageAdapter = {
  getItem: (key: string): string | null => {
    const value = storage.getString(key)
    return value ?? null
  },
  setItem: (key: string, value: string): void => {
    storage.set(key, value)
  },
  removeItem: (key: string): void => {
    storage.delete(key)
  },
  // Jotai's atomWithStorage expects subscribe for SSR safety — no-op in RN
  subscribe: (_key: string, _callback: () => void): (() => void) => {
    return () => {}
  },
}
