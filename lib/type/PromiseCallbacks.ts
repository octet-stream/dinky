import MaybePromise from "./MaybePromise"

export interface OnRejected {
  (reason: unknown): MaybePromise<unknown>
}

export interface OnFulfilled<T = unknown> {
  (value: T): MaybePromise<unknown>
}
