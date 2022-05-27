import isFunction from "./isFunction.js"

/* eslint-disable no-undef, no-restricted-globals */

const globalObject = (function (): typeof globalThis {
  // new standardized access to the global object
  if (typeof globalThis !== "undefined") {
    return globalThis
  }

  // WebWorker specific access
  if (typeof self !== "undefined") {
    return self
  }

  return window
}())

let cached: typeof globalThis.fetch | undefined

/**
 * Returns default fetch function
 */
async function getDefaultFetch(): Promise<typeof globalThis.fetch> {
  if (isFunction(globalObject.fetch)) {
    return globalObject.fetch
  }

  if (!cached) {
    const fetch = await import("node-fetch")

    cached = fetch.default as typeof globalThis.fetch
  }


  return cached
}

export default getDefaultFetch
