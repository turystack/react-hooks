import { useCallback } from 'react'

import type {
  MergeableRef,
  UseMergedRefsReturn,
} from './use-merged-refs.types.js'

function assignReference<T>(reference: MergeableRef<T>, value: T | null) {
  if (typeof reference === 'function') {
    reference(value)
  } else if (reference) {
    const mutableReference = reference as { current: T | null }
    mutableReference.current = value
  }
}

export function useMergedRefs<T>(
  ...references: Array<MergeableRef<T>>
): UseMergedRefsReturn<T> {
  return useCallback((value) => {
    for (const reference of references) {
      assignReference(reference, value)
    }
  }, references)
}
