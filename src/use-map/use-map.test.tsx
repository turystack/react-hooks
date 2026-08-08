import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useMap } from './use-map.js'

describe('useMap', () => {
  it('sets, removes and resets entries immutably', () => {
    const { result } = renderHook(() => useMap([['initial', 1]]))
    act(() => result.current[1].set('next', 2))
    expect(result.current[0].get('next')).toBe(2)
    act(() => result.current[1].remove('initial'))
    expect(result.current[0].has('initial')).toBe(false)
    act(() => result.current[1].reset())
    expect(result.current[0].size).toBe(0)
  })
})
