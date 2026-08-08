import { useCallback, useEffect, useRef } from 'react'

import { useLatest } from '../use-latest/index.js'
import type {
  DebouncedCallback,
  DebounceOptions,
} from './use-debounce-callback.types.js'

export function useDebounceCallback<TArguments extends unknown[], TResult>(
  callback: (...arguments_: TArguments) => TResult,
  delay = 500,
  options?: DebounceOptions,
): DebouncedCallback<TArguments, TResult> {
  const callbackReference = useLatest(callback)
  const argumentsReference = useRef<TArguments | undefined>(undefined)
  const resultReference = useRef<TResult | undefined>(undefined)
  const timeoutReference = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  )
  const maxWaitReference = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  )
  const pendingReference = useRef(false)
  const leading = options?.leading ?? false
  const trailing = options?.trailing ?? true
  const maxWait = options?.maxWait

  const clearTimers = useCallback(() => {
    if (timeoutReference.current) {
      clearTimeout(timeoutReference.current)
      timeoutReference.current = undefined
    }
    if (maxWaitReference.current) {
      clearTimeout(maxWaitReference.current)
      maxWaitReference.current = undefined
    }
  }, [])

  const invoke = useCallback(() => {
    const arguments_ = argumentsReference.current
    if (!arguments_) {
      return resultReference.current
    }
    argumentsReference.current = undefined
    resultReference.current = callbackReference.current(...arguments_)
    return resultReference.current
  }, [callbackReference])

  const cancel = useCallback(() => {
    clearTimers()
    argumentsReference.current = undefined
    pendingReference.current = false
  }, [clearTimers])

  const flush = useCallback(() => {
    const result = invoke()
    cancel()
    return result
  }, [cancel, invoke])

  const debounced = useCallback(
    (...arguments_: TArguments) => {
      const firstCall = !pendingReference.current
      argumentsReference.current = arguments_
      pendingReference.current = true

      if (leading && firstCall) {
        invoke()
      }

      if (timeoutReference.current) {
        clearTimeout(timeoutReference.current)
      }
      timeoutReference.current = setTimeout(() => {
        if (trailing) {
          invoke()
        }
        clearTimers()
        pendingReference.current = false
      }, delay)

      if (maxWait !== undefined && !maxWaitReference.current) {
        maxWaitReference.current = setTimeout(() => {
          invoke()
          clearTimers()
          pendingReference.current = false
        }, maxWait)
      }

      return resultReference.current
    },
    [clearTimers, delay, invoke, leading, maxWait, trailing],
  ) as DebouncedCallback<TArguments, TResult>

  debounced.cancel = cancel
  debounced.flush = flush
  debounced.isPending = () => pendingReference.current

  useEffect(() => cancel, [cancel])

  return debounced
}
