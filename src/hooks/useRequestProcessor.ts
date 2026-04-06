import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
} from '@tanstack/react-query'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'
import { AxiosError } from 'axios'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface QueryResult<TData> {
  data: TData | undefined
  isLoading: boolean
  isFetching: boolean
  isError: boolean
  error: string | null
  refetch: () => void
}

export interface MutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => void
  mutateAsync: (variables: TVariables) => Promise<TData>
  isPending: boolean
  isSuccess: boolean
  isError: boolean
  error: string | null
  reset: () => void
}

type ProcessorQueryOptions<TData, TKey extends QueryKey> = UseQueryOptions<
  TData,
  Error,
  TData,
  TKey
> & {
  /** Show an automatic error toast when the query fails. Default: false
   *  Middleware already shows toasts for HTTP errors — enable this only for
   *  non-HTTP errors (e.g. JSON parse failures). */
  showErrorToast?: boolean
  /** Custom error message override shown in the toast */
  errorMessage?: string
}

type ProcessorMutationOptions<TData, TVariables> = UseMutationOptions<
  TData,
  Error,
  TVariables
> & {
  /** Show a success toast after mutation completes. Default: false */
  showSuccessToast?: boolean
  successMessage?: string
  /** Show an error toast on mutation failure. Default: true */
  showErrorToast?: boolean
  errorMessage?: string
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function extractErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string } | undefined
    return data?.message ?? error.message ?? 'An error occurred.'
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred.'
}

// ─── useQueryProcessor ────────────────────────────────────────────────────────
// Wraps useQuery — normalises the result to a flat, predictable shape.
// All query hooks in src/hooks/queries/ call this internally.

export function useQueryProcessor<TData, TKey extends QueryKey>(
  options: ProcessorQueryOptions<TData, TKey>,
): QueryResult<TData> {
  const { showErrorToast = false, errorMessage, ...queryOptions } = options

  const query = useQuery<TData, Error, TData, TKey>(queryOptions)

  useEffect(() => {
    if (showErrorToast && query.isError && query.error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage ?? extractErrorMessage(query.error),
      })
    }
  }, [query.isError, query.error, showErrorToast, errorMessage])

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error ? extractErrorMessage(query.error) : null,
    refetch: query.refetch,
  }
}

// ─── useMutationProcessor ─────────────────────────────────────────────────────
// Wraps useMutation — normalises the result and adds optional toast support.
// All mutation hooks in src/hooks/mutations/ call this internally.

export function useMutationProcessor<TData, TVariables>(
  options: ProcessorMutationOptions<TData, TVariables>,
): MutationResult<TData, TVariables> {
  const {
    showSuccessToast = false,
    successMessage = 'Done!',
    showErrorToast = true,
    errorMessage,
    onSuccess,
    onError,
    ...mutationOptions
  } = options

  const mutation = useMutation<TData, Error, TVariables>({
    ...mutationOptions,
    onSuccess: (data, variables, context) => {
      if (showSuccessToast) {
        Toast.show({ type: 'success', text1: successMessage })
      }
      onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      if (showErrorToast) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage ?? extractErrorMessage(error),
        })
      }
      onError?.(error, variables, context)
    },
  })

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error ? extractErrorMessage(mutation.error) : null,
    reset: mutation.reset,
  }
}
