/* eslint-disable no-useless-constructor */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import isString from "./isString.js"

import {Maybe} from "./Maybe"

type Entry = readonly [string, unknown]

function assertKey(key: unknown): never | void {
  if (!isString(key)) {
    throw TypeError("Key must be a string.")
  }
}

function* assertKeys(entries: Iterable<Entry>): Generator<Entry, void> {
  for (const [key, value] of entries) {
    assertKey(key)

    yield [key, value]
  }
}

class Query extends Map<string, unknown> {
  constructor(entries?: Maybe<Iterable<Entry>>) {
    super(entries ? assertKeys(entries) : undefined)
  }

  set(key: string, value: unknown) {
    assertKey(key)

    return super.set(key, value)
  }

  get<T = unknown>(key: string): T | undefined {
    assertKey(key)

    return super.get(key) as T | undefined
  }

  has(key: string) {
    assertKey(key)

    return super.has(key)
  }

  delete(key: string) {
    assertKey(key)

    return super.delete(key)
  }

  toString(): string {
    const entries: Array<[string, string]> = []

    for (const [key, value] of this) {
      // Omit all nullish and falsy params as of they aren't necessary
      if (value || value === 0) {
        entries.push([key, String(value)])
      }
    }

    // Use URLSearchParams to stringify entries
    return new URLSearchParams(entries).toString()
  }

  get [Symbol.toStringTag](): string {
    return this.toString()
  }
}

export default Query
