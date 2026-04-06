import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { mmkvStorageAdapter } from '@/storage/mmkv'

// Global loading overlay — set true to show full-screen loader
export const globalLoadingAtom = atom<boolean>(false)

// Active toast message (optional — use if you want manual toasts via atoms)
export const toastMessageAtom = atom<string | null>(null)

// Theme preference — persisted
export const themeAtom = atomWithStorage<'light' | 'dark' | 'system'>(
  'theme',
  'system',
  mmkvStorageAdapter,
)

// Selected post ID (used to pass data between screens without navigation params)
export const selectedPostIdAtom = atom<number | null>(null)
