import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useIsMounted } from './use-is-mounted.js'

describe('useIsMounted', () => {
  it('reports mount and unmount state', () => {
    const { result, unmount } = renderHook(() => useIsMounted())
    const isMounted = result.current
    expect(isMounted()).toBe(true)
    unmount()
    expect(isMounted()).toBe(false)
  })
})
