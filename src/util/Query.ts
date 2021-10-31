import {URLSearchParams} from "url"

import isString from "./isString.js"

function assertKey(key: unknown) {
  if (!isString(key)) {
    throw TypeError("Given key must be a string.")
  }
}

class Query extends Map<string, unknown> {
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
