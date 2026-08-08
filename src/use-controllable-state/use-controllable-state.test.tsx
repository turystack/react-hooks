import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useControllableState } from './use-controllable-state.js'

describe('useControllableState', () => {
  it('updates uncontrolled state and notifies changes', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 1, onChange }),
    )

    act(() => result.current[1]((current) => current + 1))

    expect(result.current[0]).toBe(2)
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('does not mutate controlled state before its owner updates it', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 1, onChange, value: 5 }),
    )

    act(() => result.current[1](6))

    expect(result.current[0]).toBe(5)
    expect(onChange).toHaveBeenCalledWith(6)
  })
})
