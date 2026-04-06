import { createNavigationContainerRef } from '@react-navigation/native'

// Global navigation ref — allows navigation from outside the React tree
// (e.g. Axios interceptors, forceLogout in middleware.ts)
export const navigationRef = createNavigationContainerRef()
