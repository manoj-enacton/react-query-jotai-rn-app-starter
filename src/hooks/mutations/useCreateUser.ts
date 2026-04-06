import { useQueryClient } from '@tanstack/react-query'
import { useMutationProcessor, MutationResult } from '@/hooks/useRequestProcessor'
import { userMutationFns, CreateUserPayload } from '@/mutations/userMutations'
import { userKeys } from '@/queries/userQueries'
import { User } from '@/api/types'

export function useCreateUser(): MutationResult<User, CreateUserPayload> {
  const queryClient = useQueryClient()

  return useMutationProcessor<User, CreateUserPayload>({
    mutationFn: userMutationFns.create,
    showSuccessToast: true,
    successMessage: 'User created successfully!',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}
