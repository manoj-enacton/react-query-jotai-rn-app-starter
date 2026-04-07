import apiClient from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { User } from '@/api/types';

// ─── Query Keys ──────────────────────────────────────────────────────────────

export const userKeys = {
  all: ['users'] as const,
  detail: (id: number) => ['users', id] as const,
};

// ─── Query Functions ─────────────────────────────────────────────────────────

export const userQueryFns = {
  getAll: async (): Promise<User[]> => {
    const { data } = await apiClient.get<{ users: User[] }>(
      ENDPOINTS.users.list,
    );
    return data.users;
  },

  getById: async (id: number): Promise<User> => {
    const { data } = await apiClient.get<User>(ENDPOINTS.users.detail(id));
    return data;
  },
};
