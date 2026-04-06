import { useQueryClient } from '@tanstack/react-query'
import { useMutationProcessor, MutationResult } from '@/hooks/useRequestProcessor'
import { postMutationFns, CreatePostPayload } from '@/mutations/postMutations'
import { postKeys } from '@/queries/postQueries'
import { Post } from '@/api/types'

export function useCreatePost(): MutationResult<Post, CreatePostPayload> {
  const queryClient = useQueryClient()

  return useMutationProcessor<Post, CreatePostPayload>({
    mutationFn: postMutationFns.create,
    showSuccessToast: true,
    successMessage: 'Post created successfully!',
    onSuccess: () => {
      // Invalidate post list so it auto-refetches with the new item
      queryClient.invalidateQueries({ queryKey: postKeys.all })
    },
  })
}
