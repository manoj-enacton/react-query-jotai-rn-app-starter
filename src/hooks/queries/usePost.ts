import { UseQueryOptions } from '@tanstack/react-query'
import { useQueryProcessor, QueryResult } from '@/hooks/useRequestProcessor'
import { postKeys, postQueryFns } from '@/queries/postQueries'
import { Post } from '@/api/types'

type Key = ReturnType<typeof postKeys.detail>
type Options = Partial<UseQueryOptions<Post, Error, Post, Key>>

export function usePost(id: number, options?: Options): QueryResult<Post> {
  return useQueryProcessor<Post, Key>({
    queryKey: postKeys.detail(id),
    queryFn: () => postQueryFns.getById(id),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    enabled: !!id,
    ...options,
  })
}
