import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useCountdown } from './use-countdown.js'

describe('useCountdown', () => {
  afterEach(() => vi.useRealTimers())

  it('counts to the stop value and resets', () => {
    vi.useFakeTimers()
    const { result } = renderHook(() =>
      useCountdown({ countStart: 2, countStop: 0, intervalMs: 100 }),
    )

    act(() => result.current[1].startCountdown())
    act(() => vi.advanceTimersByTime(250))
    expect(result.current[0]).toBe(0)
    act(() => result.current[1].resetCountdown())
    expect(result.current[0]).toBe(2)
  })
})
