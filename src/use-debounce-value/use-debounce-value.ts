import { useRef, useState } from 'react'

import { useDebounceCallback } from '../use-debounce-callback/index.js'
import type {
  UseDebounceValueOptions,
  UseDebounceValueReturn,
} from './use-debounce-value.types.js'

export function useDebounceValue<T>(
  initialValue: T | (() => T),
  delay: number,
  options?: UseDebounceValueOptions<T>,
): UseDebounceValueReturn<T> {
  const initial = useRef(
    typeof initialValue === 'function'
      ? (initialValue as () => T)()
      : initialValue,
  )
  const [value, setValue] = useState(initial.current)
  const previousReference = useRef(initial.current)
  const update = useDebounceCallback(
    (nextValue: T) => {
      if (
        !(options?.equalityFn ?? Object.is)(
          previousReference.current,
          nextValue,
        )
      ) {
        previousReference.current = nextValue
        setValue(nextValue)
      }
    },
    delay,
    options,
  )

  return [value, update]
}
