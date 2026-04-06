import { UseQueryOptions } from '@tanstack/react-query'
import { useQueryProcessor, QueryResult } from '@/hooks/useRequestProcessor'
import { userKeys, userQueryFns } from '@/queries/userQueries'
import { User } from '@/api/types'

type Options = Partial<UseQueryOptions<User[], Error, User[], typeof userKeys.all>>

export function useUsers(options?: Options): QueryResult<User[]> {
  return useQueryProcessor<User[], typeof userKeys.all>({
    queryKey: userKeys.all,
    queryFn: userQueryFns.getAll,
    staleTime: 5 * 60 * 1000,   // 5 min — user list rarely changes
    gcTime: 10 * 60 * 1000,
    ...options,
  })
}
