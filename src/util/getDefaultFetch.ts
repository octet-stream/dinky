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

/**
 * Returns default fetch function
 */
export async function getDefaultFetch(): Promise<Fetch> {
  if (typeof fetch === "function") {
    const globalObject = getGlobalObject()

    return globalObject.fetch
  }

  const module = await import("node-fetch")

  return module.default as Fetch
}
