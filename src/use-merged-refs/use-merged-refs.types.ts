import type { Ref, RefCallback } from 'react'

export type MergeableRef<T> = Ref<T> | null | undefined
export type UseMergedRefsReturn<T> = RefCallback<T>
