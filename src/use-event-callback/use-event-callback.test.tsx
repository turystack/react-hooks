import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useEventCallback } from './use-event-callback.js'

describe('useEventCallback', () => {
  it('keeps identity while calling the latest callback', () => {
    const first = vi.fn(() => 'first')
    const second = vi.fn(() => 'second')
    const { rerender, result } = renderHook(
      ({ callback }) => useEventCallback(callback),
      { initialProps: { callback: first } },
    )
    const stableCallback = result.current

    rerender({ callback: second })

    expect(result.current).toBe(stableCallback)
    expect(result.current()).toBe('second')
    expect(first).not.toHaveBeenCalled()
  })
})
