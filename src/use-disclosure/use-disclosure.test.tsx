import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useDisclosure } from './use-disclosure.js'

describe('useDisclosure', () => {
  it('opens, closes and toggles the value', () => {
    const { result } = renderHook(() => useDisclosure())

    act(() => result.current.on())
    expect(result.current.value).toBe(true)
    act(() => result.current.off())
    expect(result.current.value).toBe(false)
    act(() => result.current.toggle())
    expect(result.current.value).toBe(true)
  })
})
