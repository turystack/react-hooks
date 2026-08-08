export type MapOrEntries<K, V> = Map<K, V> | Array<[K, V]>

export type UseMapActions<K, V> = {
  remove: (key: K) => void
  reset: () => void
  set: (key: K, value: V) => void
  setAll: (entries: MapOrEntries<K, V>) => void
}

export type UseMapReturn<K, V> = [
  Omit<Map<K, V>, 'clear' | 'delete' | 'set'>,
  UseMapActions<K, V>,
]
