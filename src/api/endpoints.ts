// All API endpoint URLs in one place — change the base URL here to switch environments

export const BASE_URL = 'https://dummyjson.com'

export const ENDPOINTS = {
  // Users
  users: {
    list: '/users',
    detail: (id: number) => `/users/${id}`,
  },

  // Posts
  posts: {
    list: '/posts',
    detail: (id: number) => `/posts/${id}`,
    byUser: (userId: number) => `/users/${userId}/posts`,
    create: '/posts/add',
    update: (id: number) => `/posts/${id}`,
    delete: (id: number) => `/posts/${id}`,
  },

  // Todos
  todos: {
    list: '/todos',
    byUser: (userId: number) => `/users/${userId}/todos`,
  },
} as const
