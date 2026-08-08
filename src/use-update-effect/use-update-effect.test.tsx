import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useUpdateEffect } from './use-update-effect.js'

describe('useUpdateEffect', () => {
  it('skips mount and runs after dependencies change', () => {
    const effect = vi.fn()
    const { rerender } = renderHook(
      ({ value }) => useUpdateEffect(effect, [value]),
      { initialProps: { value: 1 } },
    )

    expect(effect).not.toHaveBeenCalled()
    rerender({ value: 2 })
    expect(effect).toHaveBeenCalledOnce()
  })
})
