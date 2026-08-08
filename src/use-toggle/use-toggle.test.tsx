import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useToggle } from './use-toggle.js'

describe('useToggle', () => {
  it('toggles and directly sets its value', () => {
    const { result } = renderHook(() => useToggle(true))
    act(() => result.current[1]())
    expect(result.current[0]).toBe(false)
    act(() => result.current[2](true))
    expect(result.current[0]).toBe(true)
  })
})
