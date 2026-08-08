import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useUnmount } from './use-unmount.js'

describe('useUnmount', () => {
  it('runs the latest callback on unmount', () => {
    const callback = vi.fn()
    const { unmount } = renderHook(() => useUnmount(callback))
    expect(callback).not.toHaveBeenCalled()
    unmount()
    expect(callback).toHaveBeenCalledOnce()
  })
})
