import { useCallback, useState } from 'react'

import type { UseDisclosureReturn } from './use-disclosure.types.js'

export function useDisclosure(initial = false): UseDisclosureReturn {
  const [value, setValue] = useState(initial)

  const on = useCallback(() => setValue(true), [])
  const off = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue((current) => !current), [])

  return { off, on, toggle, value }
}
