import MaybePromise from "./MaybePromise"
import TypedObject from "./TypedObject"

export interface OnRejected {
  (reason: unknown): MaybePromise<unknown>
}

export interface OnFulfilled<T extends TypedObject = TypedObject> {
  (value: T): MaybePromise<unknown>
}
