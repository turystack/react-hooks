import { useRef } from 'react'

import type { LatestReference } from './use-latest.types.js'

export function useLatest<T>(value: T): LatestReference<T> {
  const reference = useRef(value)
  reference.current = value
  return reference
}
