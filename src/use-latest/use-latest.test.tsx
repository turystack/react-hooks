import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useLatest } from './use-latest.js'

describe('useLatest', () => {
  it('preserves the reference identity while exposing the latest value', () => {
    const { rerender, result } = renderHook(({ value }) => useLatest(value), {
      initialProps: { value: 'first' },
    })
    const reference = result.current

    rerender({ value: 'second' })

    expect(result.current).toBe(reference)
    expect(result.current.current).toBe('second')
  })
})
