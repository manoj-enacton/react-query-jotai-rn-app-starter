This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

---

# Project Architecture

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| `@react-navigation/native` | ^7.1.0 | Navigation |
| `@react-navigation/bottom-tabs` | ^7.3.0 | Tab bar |
| `@react-navigation/native-stack` | ^7.3.0 | Stack navigation |
| `@tanstack/react-query` | ^5.x | Server state / API calls |
| `jotai` | ^2.x | Client / UI state |
| `axios` | ^1.x | HTTP client |
| `react-native-mmkv` | ^3.x | Persistent storage |
| `react-native-toast-message` | ^2.x | Toast notifications |

---

## Folder Structure

```
src/
├── api/                   # Axios client, middleware, endpoint URLs, shared types
├── assets/                # Colors, images, animations
├── hooks/
│   ├── useRequestProcessor.ts   # Core generic wrapper for useQuery / useMutation
│   ├── queries/           # One-liner query hooks used in components
│   └── mutations/         # One-liner mutation hooks used in components
├── mutations/             # Raw mutation functions (Axios POST/PUT/DELETE calls)
├── navigation/            # Navigator, TabNavigator, stack navigators, types, ref
├── providers/             # AppProviders — QueryClient + Jotai + SafeArea + Toast
├── queries/               # Raw query functions (Axios GET calls) + query keys
├── screens/               # Screen components
├── storage/               # MMKV instance and storage key constants
└── store/atoms/           # Jotai atoms (UI/client state, persisted via MMKV)
```

---

## How to Add a New API Endpoint

Follow these 4 steps every time you add a new API feature.

### Step 1 — Add the URL to endpoints

**`src/api/endpoints.ts`**

```ts
export const ENDPOINTS = {
  dashboard: {
    stats: '/dashboard',
    revenue: '/dashboard/revenue',
  },
  // add more here ...
}
```

### Step 2a — Add the query function (GET requests)

Create **`src/queries/dashboardQueries.ts`**

```ts
import apiClient from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'

export interface DashboardStats {
  totalUsers: number
  revenue: number
}

// Query keys — used for caching and invalidation
export const dashboardKeys = {
  stats: ['dashboard', 'stats'] as const,
}

// The actual Axios call — no hooks, no React
export const dashboardQueryFns = {
  getStats: async (): Promise<DashboardStats> => {
    const { data } = await apiClient.get<DashboardStats>(ENDPOINTS.dashboard.stats)
    return data
  },
}
```

### Step 2b — Add the mutation function (POST / PUT / DELETE requests)

Create **`src/mutations/dashboardMutations.ts`**

```ts
import apiClient from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'

export interface UpdateRevenuePayload {
  amount: number
}

// The actual Axios call — no hooks, no React
export const dashboardMutationFns = {
  updateRevenue: async (payload: UpdateRevenuePayload): Promise<void> => {
    await apiClient.post(ENDPOINTS.dashboard.revenue, payload)
  },
}
```

### Step 3a — Create the one-liner query hook

Create **`src/hooks/queries/useDashboard.ts`**

```ts
import { useQueryProcessor } from '@/hooks/useRequestProcessor'
import { dashboardKeys, dashboardQueryFns, DashboardStats } from '@/queries/dashboardQueries'

export function useDashboard() {
  return useQueryProcessor<DashboardStats, typeof dashboardKeys.stats>({
    queryKey: dashboardKeys.stats,
    queryFn: dashboardQueryFns.getStats,
    staleTime: 2 * 60 * 1000,
  })
}
```

### Step 3b — Create the one-liner mutation hook

Create **`src/hooks/mutations/useUpdateRevenue.ts`**

```ts
import { useMutationProcessor } from '@/hooks/useRequestProcessor'
import { dashboardMutationFns, UpdateRevenuePayload } from '@/mutations/dashboardMutations'

export function useUpdateRevenue() {
  return useMutationProcessor<void, UpdateRevenuePayload>({
    mutationFn: dashboardMutationFns.updateRevenue,
    showSuccessToast: true,
    successMessage: 'Revenue updated!',
  })
}
```

### Step 4 — Use in your component (one line each)

```tsx
export default function DashboardScreen() {
  const { data, isLoading, error } = useDashboard()
  const { mutate, isPending } = useUpdateRevenue()

  // render...
}
```

---

## Hook Options

Both `useQueryProcessor` and `useMutationProcessor` accept options to override defaults or pass parameters.

```ts
// With query params
const { data } = usePosts({ userId: 5 })

// With query params + TanStack options override
const { data } = usePosts({ userId: 5 }, { enabled: !!userId, staleTime: 0 })

// Mutation with success/error toast control
useMutationProcessor({
  mutationFn: ...,
  showSuccessToast: true,
  successMessage: 'Saved!',
  showErrorToast: true,     // default: true
  errorMessage: 'Custom error message',
})
```

---

## State Management (Jotai + MMKV)

Atoms that need to survive app restarts are backed by MMKV via `atomWithStorage`:

```ts
// src/store/atoms/authAtoms.ts
export const authTokenAtom = atomWithStorage('auth_token', null, mmkvStorageAdapter)

// In component
const [token, setToken] = useAtom(authTokenAtom)  // auto-persists to MMKV

// Outside React (e.g. Axios interceptor) — sync read, no await
const token = storage.getString(STORAGE_KEYS.AUTH_TOKEN)
```

---

## Middleware (Axios Interceptors)

All requests pass through **`src/api/middleware.ts`** which handles:

| Scenario | Behaviour |
|---|---|
| Every request | Auth token auto-attached from MMKV |
| `401 Unauthorized` | MMKV cleared → forced navigation to Login screen |
| `403 Forbidden` | Toast: "Access Denied" |
| `404 Not Found` | Toast: "Not Found" |
| `5xx Server Error` | Toast: "Server Error" |
| Network / timeout | Toast: "Network Error" |

---

## File Ownership Summary

| What | Where |
|---|---|
| Base URL | `src/api/endpoints.ts` |
| Endpoint paths | `src/api/endpoints.ts` |
| Axios GET functions | `src/queries/*.ts` |
| Axios POST/PUT/DELETE functions | `src/mutations/*.ts` |
| Query hook (with keys + defaults) | `src/hooks/queries/*.ts` |
| Mutation hook | `src/hooks/mutations/*.ts` |
| Persistent small values | `src/storage/` + `src/store/atoms/` |
| All routes | `src/navigation/Navigator.tsx` |
| All providers | `src/providers/AppProviders.tsx` |

---

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
