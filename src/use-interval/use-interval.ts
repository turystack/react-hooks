import { useInterval as useIntervalBase } from 'usehooks-ts'

import type { IntervalCallback, IntervalDelay } from './use-interval.types.js'

export function useInterval(
  callback: IntervalCallback,
  delay: IntervalDelay,
): void {
  useIntervalBase(callback, delay)
}
