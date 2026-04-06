import { NavigatorScreenParams } from '@react-navigation/native'

// ─── Stack Param Lists ────────────────────────────────────────────────────────

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

// ─── Root Stack (wraps tabs — used for modals / login) ───────────────────────

export type RootStackParamList = {
  Main: NavigatorScreenParams<RootTabParamList>
  Login: undefined
}
