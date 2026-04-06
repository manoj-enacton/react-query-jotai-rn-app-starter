import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { mmkvStorageAdapter } from '@/storage/mmkv'
import { STORAGE_KEYS } from '@/storage/storageKeys'
import { User } from '@/api/types'

// Auth token — persisted to MMKV, survives app restarts
// Setting this to null = logged out, Navigator switches to AuthStack automatically
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

// Derived — true when token exists. Read-only, no need to store separately.
export const isAuthenticatedAtom = atom(get => !!get(authTokenAtom))
