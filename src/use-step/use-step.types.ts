import type { Dispatch, SetStateAction } from 'react'

export type UseStepActions = {
  canGoToNextStep: boolean
  canGoToPrevStep: boolean
  goToNextStep: () => void
  goToPrevStep: () => void
  reset: () => void
  setStep: Dispatch<SetStateAction<number>>
}

export type UseStepReturn = [number, UseStepActions]
