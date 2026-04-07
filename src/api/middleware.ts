import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
// import Toast from 'react-native-toast-message'  // uncomment when adding error toasts
import { appGetString, appDeleteString } from '@/utils/storageUtils'
import { STORAGE_KEYS } from '@/storage/storageKeys'
import { jotaiStore } from '@/store/store'
import { authTokenAtom, currentUserAtom } from '@/store/atoms/authAtoms'

// ─── Request Interceptor ────────────────────────────────────────────────────

function onRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const token = appGetString(STORAGE_KEYS.AUTH_TOKEN)
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

// ─── Response Interceptor ───────────────────────────────────────────────────

function onResponseError(error: AxiosError): Promise<never> {
  const status = error.response?.status
  // const data = error.response?.data as { message?: string } | undefined  // uncomment when reading error messages

  // No response = network/timeout error.
  // Do NOT toast here — TanStack Query will retry the request (retry: 2 in QueryClient).
  // Toasting on every retry attempt would spam the user with 3 identical toasts.
  // The query/mutation hook's own error state handles the UI for these cases.
  if (!error.response) {
    return Promise.reject(error)
  }

  // ─── Add your global HTTP error handling here ────────────────────────────
  // 401 → force logout (the only handler active by default)
  // Uncomment or add cases below as needed for your app.

  if (status === 401) {
    // Toast.show({ type: 'error', text1: 'Session Expired', text2: 'Please log in again.' })
    forceLogout()
  }

  // case 403 — Access denied
  // case 422 — Validation error
  // case 5xx — Server error
  // Add your own toast / navigation / logging logic here per status code

  return Promise.reject(error)
}

// ─── Force Logout ───────────────────────────────────────────────────────────
// Setting authTokenAtom to null via jotaiStore triggers the Navigator to
// switch to AuthStack automatically — no navigationRef.reset() needed.

function forceLogout(): void {
  appDeleteString(STORAGE_KEYS.AUTH_TOKEN)
  appDeleteString(STORAGE_KEYS.USER_SESSION)
  jotaiStore.set(authTokenAtom, null)
  jotaiStore.set(currentUserAtom, null)
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
