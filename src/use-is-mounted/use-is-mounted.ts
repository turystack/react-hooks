import { useIsMounted as useIsMountedBase } from 'usehooks-ts'

import type { IsMounted } from './use-is-mounted.types.js'

export function useIsMounted(): IsMounted {
  return useIsMountedBase()
}
