import type { DebouncedCallback } from '../use-debounce-callback/index.js'

export type UseDebounceValueOptions<T> = {
  equalityFn?: (left: T, right: T) => boolean
  leading?: boolean
  maxWait?: number
  trailing?: boolean
}

export type UseDebounceValueReturn<T> = [T, DebouncedCallback<[value: T], void>]
