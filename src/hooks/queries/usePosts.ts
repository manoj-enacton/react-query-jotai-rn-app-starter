import { UseQueryOptions } from '@tanstack/react-query'
import { useQueryProcessor, QueryResult } from '@/hooks/useRequestProcessor'
import { postKeys, postQueryFns, GetPostsParams } from '@/queries/postQueries'
import { Post } from '@/api/types'

type Key = ReturnType<typeof postKeys.list>
type Options = Partial<UseQueryOptions<Post[], Error, Post[], Key>>

export function usePosts(params?: GetPostsParams, options?: Options): QueryResult<Post[]> {
  return useQueryProcessor<Post[], Key>({
    queryKey: postKeys.list(params),
    queryFn: () => postQueryFns.getAll(params),
    staleTime: 2 * 60 * 1000,   // 2 min — posts can change more often
    gcTime: 5 * 60 * 1000,
    ...options,
  })
}
