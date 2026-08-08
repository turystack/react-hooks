import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useAsyncCallback } from './use-async-callback.js'

describe('useAsyncCallback', () => {
  it('executes imperative async actions and exposes their state', async () => {
    const callback = vi.fn(
      async (_signal: AbortSignal, value: number) => value * 2,
    )
    const { result } = renderHook(() => useAsyncCallback(callback))

    await act(() => result.current.execute(4))

    expect(callback).toHaveBeenCalledOnce()
    expect(result.current.status).toBe('success')
    expect(result.current.data).toBe(8)
  })

  it('exposes errors and can reset the operation', async () => {
    const error = new Error('offline')
    const { result } = renderHook(() =>
      useAsyncCallback(async () => Promise.reject(error)),
    )

    let execution!: Promise<unknown>
    act(() => {
      execution = result.current.execute()
    })
    await expect(execution).rejects.toBe(error)
    await waitFor(() => expect(result.current.status).toBe('error'))
    act(() => result.current.reset())
    expect(result.current.status).toBe('idle')
  })
})
