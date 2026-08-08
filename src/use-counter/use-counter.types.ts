import type { Dispatch, SetStateAction } from 'react'

export type UseCounterReturn = {
  count: number
  decrement: () => void
  increment: () => void
  reset: () => void
  setCount: Dispatch<SetStateAction<number>>
}
