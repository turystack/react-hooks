export type DebounceOptions = {
  leading?: boolean
  maxWait?: number
  trailing?: boolean
}

export type DebouncedCallback<TArguments extends unknown[], TResult> = ((
  ...arguments_: TArguments
) => TResult | undefined) & {
  cancel: () => void
  flush: () => TResult | undefined
  isPending: () => boolean
}
