import apiClient from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import { Post, CreatePostPayload, UpdatePostPayload } from '@/api/types'

// ─── Mutation Functions ───────────────────────────────────────────────────────
// Pure async functions — no hooks, no React, no side effects
// Used by mutation hooks in src/hooks/mutations/

export const postMutationFns = {
  create: async (payload: CreatePostPayload): Promise<Post> => {
    const { data } = await apiClient.post<Post>(ENDPOINTS.posts.create, payload)
    return data
  },

  update: async (payload: UpdatePostPayload): Promise<Post> => {
    const { id, ...body } = payload
    const { data } = await apiClient.put<Post>(ENDPOINTS.posts.update(id), body)
    return data
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(ENDPOINTS.posts.delete(id))
  },
}
