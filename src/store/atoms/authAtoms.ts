import { atomWithStorage } from 'jotai/utils'
import { mmkvStorageAdapter } from '@/storage/mmkv'
import { STORAGE_KEYS } from '@/storage/storageKeys'
import { User } from '@/api/types'

// Auth token — persisted to MMKV, survives app restarts
export const authTokenAtom = atomWithStorage<string | null>(
  STORAGE_KEYS.AUTH_TOKEN,
  null,
  mmkvStorageAdapter,
)

// Current logged-in user — persisted to MMKV
export const currentUserAtom = atomWithStorage<User | null>(
  STORAGE_KEYS.USER_SESSION,
  null,
  mmkvStorageAdapter,
)

// Derived read-only — true when a token exists
export const isAuthenticatedAtom = atomWithStorage<boolean>(
  'is_authenticated',
  false,
  mmkvStorageAdapter,
)
