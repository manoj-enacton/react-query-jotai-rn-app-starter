import { MMKV } from 'react-native-mmkv';
import { storage } from '@/storage/mmkv';
import { isEmpty, isNotEmptyArray } from './helpers';

// Encrypted MMKV instance for storing sensitive data (tokens, user session, etc.).
// Use this for data that must be encrypted at rest.
// For non-sensitive app state, prefer the Jotai atoms backed by storage in src/storage/mmkv.ts.
const STORAGE_ID = 'mobile-storage';
const ENC_KEY = 'CNL-APP-202632392';

export const MMKVStorage: MMKV = new MMKV({
  id: STORAGE_ID,
  encryptionKey: ENC_KEY,
});

export const storeString = (key: string, value: string): void => {
  if (key && value) {
    MMKVStorage.delete(key);
    MMKVStorage.set(key, value);
  }
};

export const getString = (key: string): string => {
  if (key) {
    return MMKVStorage.getString(key) ?? '';
  }
  return '';
};

export const deleteString = (key: string): void => {
  if (key) {
    MMKVStorage.delete(key);
  }
};

export const storeObject = (key: string, dataObj: object): void => {
  if (key && !isEmpty(dataObj)) {
    MMKVStorage.delete(key);
    MMKVStorage.set(key, JSON.stringify(dataObj));
  }
};

export const getObject = <T = unknown>(key: string): T | undefined => {
  if (key) {
    const raw = MMKVStorage.getString(key);
    if (!isEmpty(raw)) {
      return JSON.parse(raw as string) as T;
    }
  }
  return undefined;
};

export const getAllKeys = (): string[] => {
  const allKeys = MMKVStorage.getAllKeys();
  return isNotEmptyArray(allKeys) ? allKeys : [];
};

// ─── Unencrypted app storage helpers ────────────────────────────────────────
// For non-sensitive app state backed by Jotai atoms (theme, session flags, etc.).
// Auth tokens and user session are persisted here via atomWithStorage.

export const appStoreString = (key: string, value: string): void => {
  if (key && value) {
    storage.delete(key);
    storage.set(key, value);
  }
};

export const appGetString = (key: string): string => {
  if (key) {
    return storage.getString(key) ?? '';
  }
  return '';
};

export const appDeleteString = (key: string): void => {
  if (key) {
    storage.delete(key);
  }
};

export const appStoreObject = (key: string, dataObj: object): void => {
  if (key && !isEmpty(dataObj)) {
    storage.delete(key);
    storage.set(key, JSON.stringify(dataObj));
  }
};

export const appGetObject = <T = unknown>(key: string): T | undefined => {
  if (key) {
    const raw = storage.getString(key);
    if (!isEmpty(raw)) {
      return JSON.parse(raw as string) as T;
    }
  }
  return undefined;
};

export default MMKVStorage;
