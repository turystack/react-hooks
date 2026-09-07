import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { DataOutcomeContext, useDataOutcome } from './use-data-outcome.js'
import type { DataQuery } from './use-data-outcome.types.js'

function makeQuery<T>(overrides: Partial<DataQuery<T>> = {}): DataQuery<T> {
  return {
    isFetching: false,
    isPending: false,
    refetch: vi.fn(),
    ...overrides,
  }
}

describe('useDataOutcome', () => {
  it('reports pending before anything else', () => {
    const { result } = renderHook(() =>
      useDataOutcome({
        query: makeQuery({ error: new Error('boom'), isPending: true }),
      }),
    )

    expect(result.current.status).toBe('pending')
  })

  it('resolves a denial before the generic error branch', () => {
    const { result } = renderHook(() =>
      useDataOutcome({
        denied: () => 'This period is closed',
        query: makeQuery({ error: new Error('forbidden') }),
      }),
    )

    expect(result.current).toMatchObject({
      reason: 'This period is closed',
      status: 'denied',
    })
  })

  it('reads the denial resolver from the context', () => {
    const { result } = renderHook(
      () => useDataOutcome({ query: makeQuery({ error: new Error('nope') }) }),
      {
        wrapper: ({ children }) => (
          <DataOutcomeContext value={{ denied: () => 'Ask for access' }}>
            {children}
          </DataOutcomeContext>
        ),
      },
    )

    expect(result.current).toMatchObject({
      reason: 'Ask for access',
      status: 'denied',
    })
  })

  it('reports an error a resolver did not claim, and retries the query', () => {
    const refetch = vi.fn()
    const { result } = renderHook(() =>
      useDataOutcome({
        denied: () => undefined,
        query: makeQuery({ error: new Error('boom'), refetch }),
      }),
    )

    expect(result.current.status).toBe('error')
    result.current.retry()
    expect(refetch).toHaveBeenCalledOnce()
  })

  it('reports an empty array without a predicate of its own', () => {
    const { result } = renderHook(() =>
      useDataOutcome({ query: makeQuery({ data: [] }) }),
    )

    expect(result.current.status).toBe('empty')
  })

  it('takes a predicate for data that is not an array', () => {
    const { result } = renderHook(() =>
      useDataOutcome({
        empty: (data: { total: number }) => data.total === 0,
        query: makeQuery({ data: { total: 0 } }),
      }),
    )

    expect(result.current.status).toBe('empty')
  })

  it('selects the rows out of the envelope and reports refreshing', () => {
    const { result } = renderHook(() =>
      useDataOutcome({
        query: makeQuery({
          data: { data: [1, 2], meta: { page: 1 } },
          isFetching: true,
        }),
        select: (page) => page.data,
      }),
    )

    expect(result.current).toMatchObject({
      data: [1, 2],
      refreshing: true,
      status: 'success',
    })
  })
})
