import { MMKV } from 'react-native-mmkv'
import { createJSONStorage } from 'jotai/utils'

// Single MMKV instance for the entire app.
// Use this directly outside React (e.g. Axios interceptors).
// Inside React, prefer Jotai atoms backed by this storage.
export const storage = new MMKV({ id: 'app-storage' })

// Raw string-level adapter — MMKV only accepts strings, so we keep this layer thin.
const mmkvRawAdapter = {
  getItem: (key: string): string | null => storage.getString(key) ?? null,
  setItem: (key: string, value: string): void => storage.set(key, value),
  removeItem: (key: string): void => storage.delete(key),
}

// Jotai-compatible storage adapter.
// createJSONStorage wraps the raw adapter and handles JSON.stringify/parse automatically,
// so Jotai never passes raw objects or null directly to MMKV.
export const mmkvStorageAdapter = createJSONStorage(() => mmkvRawAdapter)
