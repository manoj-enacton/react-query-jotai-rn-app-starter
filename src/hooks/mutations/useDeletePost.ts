import { useQueryClient } from '@tanstack/react-query'
import { useMutationProcessor, MutationResult } from '@/hooks/useRequestProcessor'
import { postMutationFns } from '@/mutations/postMutations'
import { postKeys } from '@/queries/postQueries'

export function useDeletePost(): MutationResult<void, number> {
  const queryClient = useQueryClient()

  return useMutationProcessor<void, number>({
    mutationFn: postMutationFns.delete,
    showSuccessToast: true,
    successMessage: 'Post deleted.',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all })
    },
  })
}
