import { useEffect, useRef } from 'react'

import type { UseUpdateEffect } from './use-update-effect.types.js'

export const useUpdateEffect: UseUpdateEffect = (effect, dependencies) => {
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return effect()
  }, dependencies)
}
