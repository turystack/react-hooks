import { useEventCallback as useEventCallbackBase } from 'usehooks-ts'

import type { EventCallback } from './use-event-callback.types.js'

export function useEventCallback<TArguments extends unknown[], TResult>(
  callback: EventCallback<TArguments, TResult>,
): EventCallback<TArguments, TResult>
export function useEventCallback<TArguments extends unknown[], TResult>(
  callback: EventCallback<TArguments, TResult> | undefined,
): EventCallback<TArguments, TResult> | undefined
export function useEventCallback<TArguments extends unknown[], TResult>(
  callback: EventCallback<TArguments, TResult> | undefined,
) {
  return useEventCallbackBase(callback)
}
