import { type SetStateAction, useCallback, useRef, useState } from 'react'

import { useLatest } from '../use-latest/index.js'
import type {
  UseControllableStateOptions,
  UseControllableStateReturn,
} from './use-controllable-state.types.js'

export function useControllableState<T>({
  defaultValue,
  onChange,
  value,
}: UseControllableStateOptions<T>): UseControllableStateReturn<T> {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const controlled = value !== undefined
  const currentValue = controlled ? value : internalValue
  const currentReference = useRef(currentValue)
  const onChangeReference = useLatest(onChange)
  currentReference.current = currentValue

  const setValue = useCallback(
    (nextValue: SetStateAction<T>) => {
      const next =
        typeof nextValue === 'function'
          ? (nextValue as (current: T) => T)(currentReference.current)
          : nextValue

      if (Object.is(next, currentReference.current)) {
        return
      }
      if (!controlled) {
        currentReference.current = next
        setInternalValue(next)
      }
      onChangeReference.current?.(next)
    },
    [controlled, onChangeReference],
  )

  return [currentValue, setValue]
}
