import { useRef } from 'react'

import type { PreviousValue } from './use-previous.types.js'

type PreviousReference<T> = {
  initialized: boolean
  value: T
}

export function usePrevious<T>(value: T): PreviousValue<T> {
  const reference = useRef<PreviousReference<T>>({
    initialized: false,
    value,
  })
  const previous = reference.current.initialized
    ? reference.current.value
    : undefined

  reference.current = {
    initialized: true,
    value,
  }

  return previous
}
