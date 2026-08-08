import { useUnmount as useUnmountBase } from 'usehooks-ts'

import type { UnmountCallback } from './use-unmount.types.js'

export function useUnmount(callback: UnmountCallback): void {
  useUnmountBase(callback)
}
