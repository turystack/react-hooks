import type { Dispatch, SetStateAction } from 'react'

export type UseControllableStateOptions<T> = {
  defaultValue: T
  onChange?: (value: T) => void
  value?: T
}

export type UseControllableStateReturn<T> = [T, Dispatch<SetStateAction<T>>]
