import apiClient from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import { User } from '@/api/types'

// ─── Query Keys ─────────────────────────────────────────────────────────────
// Centralised keys ensure consistent cache invalidation everywhere

export const userKeys = {
  all: ['users'] as const,
  detail: (id: number) => ['users', id] as const,
}

// ─── Query Functions ─────────────────────────────────────────────────────────

export const userQueryFns = {
  getAll: async (): Promise<User[]> => {
    const { data } = await apiClient.get<User[]>(ENDPOINTS.users.list)
    return data
  },

  getById: async (id: number): Promise<User> => {
    const { data } = await apiClient.get<User>(ENDPOINTS.users.detail(id))
    return data
  },
}
