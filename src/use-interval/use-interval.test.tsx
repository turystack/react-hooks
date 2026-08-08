import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useInterval } from './use-interval.js'

describe('useInterval', () => {
  afterEach(() => vi.useRealTimers())

  it('runs repeatedly and pauses when delay is null', () => {
    vi.useFakeTimers()
    const callback = vi.fn()
    const { rerender } = renderHook(
      ({ delay }) => useInterval(callback, delay),
      { initialProps: { delay: 100 as number | null } },
    )

    vi.advanceTimersByTime(250)
    expect(callback).toHaveBeenCalledTimes(2)
    rerender({ delay: null })
    vi.advanceTimersByTime(300)
    expect(callback).toHaveBeenCalledTimes(2)
  })
})
