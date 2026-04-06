// ─── Common API types ────────────────────────────────────────────────────────

export interface ApiError {
  message: string
  status?: number
  code?: string
}

// DummyJSON wraps list responses in a paginated envelope
export interface DummyListResponse<T> {
  total: number
  skip: number
  limit: number
  [key: string]: T[] | number  // e.g. { users: User[], total, skip, limit }
}

// ─── User ────────────────────────────────────────────────────────────────────

export interface User {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  phone: string
  image: string
  age: number
  gender: string
  address: {
    address: string
    city: string
    state: string
    country: string
    postalCode: string
  }
  company: {
    name: string
    title: string
    department: string
  }
}

// ─── Post ────────────────────────────────────────────────────────────────────

export interface Post {
  id: number
  userId: number
  title: string
  body: string
  tags: string[]
  reactions: { likes: number; dislikes: number }
  views: number
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
