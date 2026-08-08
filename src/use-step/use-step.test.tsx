import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useStep } from './use-step.js'

describe('useStep', () => {
  it('navigates within its configured boundaries', () => {
    const { result } = renderHook(() => useStep(3))
    expect(result.current[0]).toBe(1)
    expect(result.current[1].canGoToPrevStep).toBe(false)
    act(() => result.current[1].goToNextStep())
    expect(result.current[0]).toBe(2)
    act(() => result.current[1].setStep(3))
    expect(result.current[1].canGoToNextStep).toBe(false)
    act(() => result.current[1].reset())
    expect(result.current[0]).toBe(1)
  })
})
