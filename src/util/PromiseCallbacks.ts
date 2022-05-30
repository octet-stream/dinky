import type {MaybePromise} from "./MaybePromise.js"

export interface OnFulfilled<T = unknown, R = T> {
  (value: T): MaybePromise<R>
}

export interface OnRejected<R = unknown> {
  (reason: Error): MaybePromise<R>
}
