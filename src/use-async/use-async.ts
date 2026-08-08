import { useCallback, useEffect, useRef, useState } from 'react'

import { useLatest } from '../use-latest/index.js'
import type {
  AsyncFactory,
  AsyncState,
  UseAsyncReturn,
} from './use-async.types.js'

export function useAsync<T, E = Error>(
  factory: AsyncFactory<T>,
  dependencies: ReadonlyArray<unknown>,
): UseAsyncReturn<T, E> {
  const factoryReference = useLatest(factory)
  const controllerReference = useRef<AbortController | null>(null)
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<AsyncState<T, E>>({ status: 'idle' })

  const cancel = useCallback(() => controllerReference.current?.abort(), [])
  const retry = useCallback(() => setAttempt((value) => value + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    controllerReference.current = controller
    setState((current) => ({
      data: 'data' in current ? current.data : undefined,
      status: 'loading',
    }))

    factoryReference.current(controller.signal).then(
      (data) => {
        if (!controller.signal.aborted) {
          setState({ data, status: 'success' })
        }
      },
      (error: E) => {
        if (!controller.signal.aborted) {
          setState({ error, status: 'error' })
        }
      },
    )

    return () => controller.abort()
  }, [attempt, factoryReference, ...dependencies])

  return { ...state, cancel, retry }
}
