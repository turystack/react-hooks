import { useMap as useMapBase } from 'usehooks-ts'

import type { MapOrEntries, UseMapReturn } from './use-map.types.js'

export function useMap<K, V>(
  initialState?: MapOrEntries<K, V>,
): UseMapReturn<K, V> {
  return useMapBase(initialState)
}
