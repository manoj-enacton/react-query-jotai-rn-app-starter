import { NavigatorScreenParams } from '@react-navigation/native'

// ─── Auth Stack ───────────────────────────────────────────────────────────────

export type AuthStackParamList = {
  Onboarding: undefined
  Login: undefined
  Signup: undefined
  PasswordReset: undefined
}

// ─── Main App Stacks ──────────────────────────────────────────────────────────

export type HomeStackParamList = {
  Home: undefined
  PostDetail: { postId: number }
}

export type ExploreStackParamList = {
  Explore: undefined
}

export type ProfileStackParamList = {
  Profile: undefined
}

// ─── Root Tab Param List ─────────────────────────────────────────────────────

export type RootTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>
  ExploreTab: NavigatorScreenParams<ExploreStackParamList>
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>
}

// ─── Root Stack ───────────────────────────────────────────────────────────────
// Auth and Main are mutually exclusive — only one is mounted at a time.
// Switching authTokenAtom between null ↔ value switches stacks automatically.

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>
  Main: NavigatorScreenParams<RootTabParamList>
}
