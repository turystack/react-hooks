import { useCounter as useCounterBase } from 'usehooks-ts'

import type { UseCounterReturn } from './use-counter.types.js'

export function useCounter(initialValue = 0): UseCounterReturn {
  return useCounterBase(initialValue)
}
