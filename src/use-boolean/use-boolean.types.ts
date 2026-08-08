import type { Dispatch, SetStateAction } from 'react'

export type UseBooleanReturn = {
  setFalse: () => void
  setTrue: () => void
  setValue: Dispatch<SetStateAction<boolean>>
  toggle: () => void
  value: boolean
}
