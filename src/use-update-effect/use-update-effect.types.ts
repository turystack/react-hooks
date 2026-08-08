import type { DependencyList, EffectCallback } from 'react'

export type UseUpdateEffect = (
  effect: EffectCallback,
  dependencies?: DependencyList,
) => void
