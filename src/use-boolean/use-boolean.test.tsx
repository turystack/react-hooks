import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useBoolean } from './use-boolean.js'

describe('useBoolean', () => {
  it('provides explicit and toggle actions', () => {
    const { result } = renderHook(() => useBoolean())
    act(() => result.current.setTrue())
    expect(result.current.value).toBe(true)
    act(() => result.current.toggle())
    expect(result.current.value).toBe(false)
    act(() => result.current.setValue(true))
    act(() => result.current.setFalse())
    expect(result.current.value).toBe(false)
  })
})
