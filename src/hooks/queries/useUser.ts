import { UseQueryOptions } from '@tanstack/react-query'
import { useQueryProcessor, QueryResult } from '@/hooks/useRequestProcessor'
import { userKeys, userQueryFns } from '@/queries/userQueries'
import { User } from '@/api/types'

type Key = ReturnType<typeof userKeys.detail>
type Options = Partial<UseQueryOptions<User, Error, User, Key>>

export function useUser(id: number, options?: Options): QueryResult<User> {
  return useQueryProcessor<User, Key>({
    queryKey: userKeys.detail(id),
    queryFn: () => userQueryFns.getById(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!id,
    ...options,
  })
}
