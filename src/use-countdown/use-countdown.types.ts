export type CountdownOptions = {
  countStart: number
  countStop?: number
  intervalMs?: number
  isIncrement?: boolean
}

export type CountdownControllers = {
  resetCountdown: () => void
  startCountdown: () => void
  stopCountdown: () => void
}

export type UseCountdownReturn = [number, CountdownControllers]
