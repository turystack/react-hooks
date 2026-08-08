export type AsyncCallbackState<T, E = Error> =
  | { data?: undefined; error?: undefined; status: 'idle' }
  | { data?: T; error?: undefined; status: 'loading' }
  | { data: T; error?: undefined; status: 'success' }
  | { data?: T; error: E; status: 'error' }

export type AsyncCallback<TArguments extends unknown[], T> = (
  signal: AbortSignal,
  ...arguments_: TArguments
) => Promise<T>

export type UseAsyncCallbackReturn<
  TArguments extends unknown[],
  T,
  E = Error,
> = AsyncCallbackState<T, E> & {
  cancel: () => void
  execute: (...arguments_: TArguments) => Promise<T>
  reset: () => void
}
