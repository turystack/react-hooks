import type { Dispatch, SetStateAction } from 'react'

export type UseToggleReturn = [
  boolean,
  () => void,
  Dispatch<SetStateAction<boolean>>,
]
