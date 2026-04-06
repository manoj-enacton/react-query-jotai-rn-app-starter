// ─── Common API types ────────────────────────────────────────────────────────

export interface ApiError {
  message: string
  status?: number
  code?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

// ─── User ────────────────────────────────────────────────────────────────────

export interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: { lat: string; lng: string }
  }
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

// ─── Post ────────────────────────────────────────────────────────────────────

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface CreatePostPayload {
  userId: number
  title: string
  body: string
}

export interface UpdatePostPayload {
  id: number
  title?: string
  body?: string
}

// ─── Todo ────────────────────────────────────────────────────────────────────

export interface Todo {
  id: number
  userId: number
  title: string
  completed: boolean
}
