import apiClient from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import { Post } from '@/api/types'

// ─── Query Params ────────────────────────────────────────────────────────────

export interface GetPostsParams {
  userId?: number
}

// ─── Query Keys ──────────────────────────────────────────────────────────────

export const postKeys = {
  all: ['posts'] as const,
  list: (params?: GetPostsParams) => ['posts', 'list', params ?? {}] as const,
  detail: (id: number) => ['posts', id] as const,
  byUser: (userId: number) => ['posts', 'user', userId] as const,
}

// ─── Query Functions ─────────────────────────────────────────────────────────

export const postQueryFns = {
  getAll: async (params?: GetPostsParams): Promise<Post[]> => {
    const url = params?.userId
      ? ENDPOINTS.posts.byUser(params.userId)
      : ENDPOINTS.posts.list
    const { data } = await apiClient.get<Post[]>(url)
    return data
  },

  getById: async (id: number): Promise<Post> => {
    const { data } = await apiClient.get<Post>(ENDPOINTS.posts.detail(id))
    return data
  },
}
