import { useStep as useStepBase } from 'usehooks-ts'

import type { UseStepReturn } from './use-step.types.js'

export function useStep(maxStep: number): UseStepReturn {
  return useStepBase(maxStep)
}
