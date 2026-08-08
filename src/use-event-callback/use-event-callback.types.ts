export type EventCallback<TArguments extends unknown[], TResult> = (
  ...arguments_: TArguments
) => TResult
