import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useDebounceValue } from './use-debounce-value.js'

describe('useDebounceValue', () => {
  afterEach(() => vi.useRealTimers())

  it('updates the exposed value after the delay', () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useDebounceValue('initial', 100))

    act(() => result.current[1]('next'))
    expect(result.current[0]).toBe('initial')
    act(() => vi.advanceTimersByTime(100))
    expect(result.current[0]).toBe('next')
  })
})
