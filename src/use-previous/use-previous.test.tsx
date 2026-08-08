import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { usePrevious } from './use-previous.js'

describe('usePrevious', () => {
  it('returns undefined initially and the previous value after updates', () => {
    const { rerender, result } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'first' },
    })

    expect(result.current).toBeUndefined()
    rerender({ value: 'second' })
    expect(result.current).toBe('first')
  })
})
