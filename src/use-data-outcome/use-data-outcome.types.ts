export type DataQuery<T> = {
  data?: T
  error?: unknown
  isFetching: boolean
  isPending: boolean
  refetch: () => unknown
}

export type DenialResolver = (error: unknown) => string | undefined

export type DataOutcomeConfig = {
  denied?: DenialResolver
}

export type DataOutcomeState<T> =
  | { status: 'pending' }
  | { reason: string; status: 'denied' }
  | { error: unknown; status: 'error' }
  | { status: 'empty' }
  | { data: T; refreshing: boolean; status: 'success' }

export type DataOutcome<T> = DataOutcomeState<T> & {
  retry: () => void
}

export type UseDataOutcomeOptions<TQuery, TData = TQuery> = {
  denied?: DenialResolver
  empty?: (data: TData) => boolean
  query: DataQuery<TQuery>
  select?: (data: TQuery) => TData
}
