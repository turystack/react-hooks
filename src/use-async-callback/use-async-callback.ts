import { useCallback, useEffect, useRef, useState } from 'react'

import { useLatest } from '../use-latest/index.js'
import type {
  AsyncCallback,
  AsyncCallbackState,
  UseAsyncCallbackReturn,
} from './use-async-callback.types.js'

export function useAsyncCallback<TArguments extends unknown[], T, E = Error>(
  callback: AsyncCallback<TArguments, T>,
): UseAsyncCallbackReturn<TArguments, T, E> {
  const callbackReference = useLatest(callback)
  const controllerReference = useRef<AbortController | null>(null)
  const invocationReference = useRef(0)
  const [state, setState] = useState<AsyncCallbackState<T, E>>({
    status: 'idle',
  })

  const cancel = useCallback(() => controllerReference.current?.abort(), [])
  const reset = useCallback(() => {
    controllerReference.current?.abort()
    invocationReference.current += 1
    setState({ status: 'idle' })
  }, [])
  const execute = useCallback(
    async (...arguments_: TArguments) => {
      controllerReference.current?.abort()
      const controller = new AbortController()
      const invocation = invocationReference.current + 1
      controllerReference.current = controller
      invocationReference.current = invocation
      setState((current) => ({
        data: 'data' in current ? current.data : undefined,
        status: 'loading',
      }))

      try {
        const data = await callbackReference.current(
          controller.signal,
          ...arguments_,
        )
        if (
          !controller.signal.aborted &&
          invocationReference.current === invocation
        ) {
          setState({ data, status: 'success' })
        }
        return data
      } catch (error) {
        if (
          !controller.signal.aborted &&
          invocationReference.current === invocation
        ) {
          setState({ error: error as E, status: 'error' })
        }
        throw error
      }
    },
    [callbackReference],
  )

  useEffect(() => () => controllerReference.current?.abort(), [])

  return { ...state, cancel, execute, reset }
}
