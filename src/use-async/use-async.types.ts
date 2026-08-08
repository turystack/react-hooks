export type AsyncState<T, E = Error> =
  | { data?: undefined; error?: undefined; status: 'idle' }
  | { data?: T; error?: undefined; status: 'loading' }
  | { data: T; error?: undefined; status: 'success' }
  | { data?: T; error: E; status: 'error' }

export type AsyncFactory<T> = (signal: AbortSignal) => Promise<T>

export type UseAsyncReturn<T, E = Error> = AsyncState<T, E> & {
  cancel: () => void
  retry: () => void
}
