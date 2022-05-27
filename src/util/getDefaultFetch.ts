import isFunction from "./isFunction.js"

/* eslint-disable no-undef, no-restricted-globals */

function getGlobalObject (): typeof globalThis {
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

let cached: typeof globalThis.fetch | undefined

/**
 * Returns default fetch function
 */
async function getDefaultFetch(): Promise<typeof globalThis.fetch> {
  if (cached) {
    return cached
  }

  const globalObject = getGlobalObject()

  if (isFunction(globalObject.fetch)) {
    cached = globalObject.fetch

    return cached
  }

  const fetch = await import("node-fetch")

  cached = fetch.default as typeof globalThis.fetch

  return cached
}

export default getDefaultFetch
