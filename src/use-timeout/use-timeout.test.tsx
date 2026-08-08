import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useTimeout } from './use-timeout.js'

describe('useTimeout', () => {
  afterEach(() => vi.useRealTimers())

  it('runs once after the delay', () => {
    vi.useFakeTimers()
    const callback = vi.fn()
    renderHook(() => useTimeout(callback, 100))

    vi.advanceTimersByTime(99)
    expect(callback).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledOnce()
  })
})
