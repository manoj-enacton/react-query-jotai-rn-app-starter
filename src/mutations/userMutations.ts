import apiClient from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import { User } from '@/api/types'

export interface CreateUserPayload {
  name: string
  username: string
  email: string
}

// ─── Mutation Functions ───────────────────────────────────────────────────────

export const userMutationFns = {
  create: async (payload: CreateUserPayload): Promise<User> => {
    const { data } = await apiClient.post<User>(ENDPOINTS.users.list, payload)
    return data
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(ENDPOINTS.users.detail(id))
  },
}
