import isFunction from "./isFunction.js"

/* eslint-disable no-undef, no-restricted-globals */

/* c8 ignore start */
function getGlobalObject(): typeof globalThis {
  // new standardized access to the global object
  if (typeof globalThis !== "undefined") {
    return globalThis
  }

  // WebWorker specific access
  if (typeof self !== "undefined") {
    return self
  }

  return window
}
/* c8 ignore stop */

export type Fetch = typeof globalThis.fetch

let cached: Fetch | undefined

/**
 * Returns default fetch function
 */
export async function getDefaultFetch(): Promise<Fetch> {
  if (cached) {
    return cached
  }

  const globalObject = getGlobalObject()

  if (isFunction(globalObject.fetch)) {
    cached = globalObject.fetch

    return cached
  }

  const fetch = await import("node-fetch")

  cached = fetch.default as Fetch

  return cached
}
