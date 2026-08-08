import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useCounter } from './use-counter.js'

describe('useCounter', () => {
  it('increments, decrements and resets to the initial value', () => {
    const { result } = renderHook(() => useCounter(3))
    act(() => result.current.increment())
    expect(result.current.count).toBe(4)
    act(() => result.current.decrement())
    act(() => result.current.reset())
    expect(result.current.count).toBe(3)
  })
})
