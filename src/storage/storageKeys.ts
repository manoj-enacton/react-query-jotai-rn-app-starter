// All MMKV storage keys in one place — avoids magic strings scattered across the app

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_SESSION: 'user_session',
  THEME: 'theme',
  LANGUAGE: 'language',
  ONBOARDING_COMPLETE: 'onboarding_complete',
} as const

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]
