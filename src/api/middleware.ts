import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import Toast from 'react-native-toast-message'
import { storage } from '@/storage/mmkv'
import { STORAGE_KEYS } from '@/storage/storageKeys'
import { navigationRef } from '@/navigation/navigationRef'

// ─── Request Interceptor ────────────────────────────────────────────────────

function onRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token = storage.getString(STORAGE_KEYS.AUTH_TOKEN)
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

// ─── Response Interceptor ───────────────────────────────────────────────────

function onResponseError(error: AxiosError): Promise<never> {
  const status = error.response?.status
  const data = error.response?.data as { message?: string } | undefined

  if (!error.response) {
    // Network / timeout error
    Toast.show({
      type: 'error',
      text1: 'Network Error',
      text2: 'Please check your internet connection.',
    })
    return Promise.reject(error)
  }

  switch (status) {
    case 401:
      Toast.show({
        type: 'error',
        text1: 'Session Expired',
        text2: 'Please log in again.',
      })
      forceLogout()
      break

    case 403:
      Toast.show({
        type: 'error',
        text1: 'Access Denied',
        text2: "You don't have permission to perform this action.",
      })
      break

    case 404:
      Toast.show({
        type: 'error',
        text1: 'Not Found',
        text2: data?.message ?? 'The requested resource was not found.',
      })
      break

    case 422:
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: data?.message ?? 'Please check the information you entered.',
      })
      break

    default:
      if (status !== undefined && status >= 500) {
        Toast.show({
          type: 'error',
          text1: 'Server Error',
          text2: 'Something went wrong. Please try again later.',
        })
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: data?.message ?? 'An unexpected error occurred.',
        })
      }
  }

  return Promise.reject(error)
}

// ─── Force Logout ───────────────────────────────────────────────────────────

function forceLogout(): void {
  // Clear persisted auth data
  storage.delete(STORAGE_KEYS.AUTH_TOKEN)
  storage.delete(STORAGE_KEYS.USER_SESSION)

  // Navigate to Login — works even outside React tree
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: 'Login' as never }],
    })
  }
}

// ─── Apply to Axios Instance ────────────────────────────────────────────────

export function applyMiddleware(client: AxiosInstance): void {
  client.interceptors.request.use(onRequest)
  client.interceptors.response.use(
    response => response,
    onResponseError,
  )
}

export { forceLogout }
