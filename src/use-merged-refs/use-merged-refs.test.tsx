import { renderHook } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { useMergedRefs } from './use-merged-refs.js'

describe('useMergedRefs', () => {
  it('assigns callback and object references', () => {
    const objectReference = createRef<{ id: string }>()
    const callbackReference = vi.fn()
    const { result } = renderHook(() =>
      useMergedRefs(objectReference, callbackReference),
    )
    const value = { id: 'field' }

    result.current(value)

    expect(objectReference.current).toBe(value)
    expect(callbackReference).toHaveBeenCalledWith(value)
  })
})
