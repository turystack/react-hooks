import { useBoolean as useBooleanBase } from 'usehooks-ts'

import type { UseBooleanReturn } from './use-boolean.types.js'

export function useBoolean(defaultValue = false): UseBooleanReturn {
  return useBooleanBase(defaultValue)
}
