import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useDebounceCallback } from './use-debounce-callback.js'

describe('useDebounceCallback', () => {
  afterEach(() => vi.useRealTimers())

  it('collapses calls and exposes pending controls', () => {
    vi.useFakeTimers()
    const callback = vi.fn()
    const { result } = renderHook(() => useDebounceCallback(callback, 100))

    result.current('first')
    result.current('second')
    expect(result.current.isPending()).toBe(true)
    vi.advanceTimersByTime(100)

    expect(callback).toHaveBeenCalledOnce()
    expect(callback).toHaveBeenCalledWith('second')
    expect(result.current.isPending()).toBe(false)
  })
})
