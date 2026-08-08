import { useToggle as useToggleBase } from 'usehooks-ts'

import type { UseToggleReturn } from './use-toggle.types.js'

export function useToggle(defaultValue = false): UseToggleReturn {
  return useToggleBase(defaultValue)
}
