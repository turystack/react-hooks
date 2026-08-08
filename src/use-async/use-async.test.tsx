import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useAsync } from './use-async.js'

describe('useAsync', () => {
  it('runs and retries an asynchronous factory', async () => {
    const factory = vi
      .fn<(signal: AbortSignal) => Promise<string>>()
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce('recovered')
    const { result } = renderHook(() => useAsync(factory, []))

    await waitFor(() => expect(result.current.status).toBe('error'))
    act(() => result.current.retry())
    await waitFor(() => expect(result.current.status).toBe('success'))

    expect(result.current.data).toBe('recovered')
    expect(factory).toHaveBeenCalledTimes(2)
  })

  it('aborts the active factory when cancelled', async () => {
    let receivedSignal: AbortSignal | undefined
    const { result } = renderHook(() =>
      useAsync((signal) => {
        receivedSignal = signal
        return new Promise<string>(() => undefined)
      }, []),
    )
    await waitFor(() => expect(result.current.status).toBe('loading'))

    act(() => result.current.cancel())
    expect(receivedSignal?.aborted).toBe(true)
  })
})
