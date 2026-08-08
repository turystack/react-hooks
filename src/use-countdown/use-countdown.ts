import { useCountdown as useCountdownBase } from 'usehooks-ts'

import type {
  CountdownOptions,
  UseCountdownReturn,
} from './use-countdown.types.js'

export function useCountdown(options: CountdownOptions): UseCountdownReturn {
  return useCountdownBase(options)
}
