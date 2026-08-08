import { useTimeout as useTimeoutBase } from 'usehooks-ts'

import type { TimeoutCallback, TimeoutDelay } from './use-timeout.types.js'

export function useTimeout(
  callback: TimeoutCallback,
  delay: TimeoutDelay,
): void {
  useTimeoutBase(callback, delay)
}
