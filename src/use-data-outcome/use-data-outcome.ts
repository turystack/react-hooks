import { createContext, useCallback, useContext } from 'react'

import type {
  DataOutcome,
  DataOutcomeConfig,
  UseDataOutcomeOptions,
} from './use-data-outcome.types.js'

export const DataOutcomeContext = createContext<DataOutcomeConfig>({})

function isEmptyArray(data: unknown): boolean {
  return Array.isArray(data) && data.length === 0
}

export function useDataOutcome<TQuery, TData = TQuery>({
  denied,
  empty = isEmptyArray,
  query,
  select,
}: UseDataOutcomeOptions<TQuery, TData>): DataOutcome<TData> {
  const config = useContext(DataOutcomeContext)
  const { refetch } = query

  const retry = useCallback(() => {
    refetch()
  }, [refetch])

  if (query.isPending) {
    return { retry, status: 'pending' }
  }

  if (query.error !== undefined && query.error !== null) {
    const reason = (denied ?? config.denied)?.(query.error)

    if (reason !== undefined) {
      return { reason, retry, status: 'denied' }
    }

    return { error: query.error, retry, status: 'error' }
  }

  const source = query.data as TQuery
  const data = select ? select(source) : (source as unknown as TData)

  if (empty(data)) {
    return { retry, status: 'empty' }
  }

  return { data, refreshing: query.isFetching, retry, status: 'success' }
}
