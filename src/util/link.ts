import {URL} from "url"

import fetch from "isomorphic-fetch"
import camelCase from "camelcase-keys"

import NetworkError from "./NetworkError"
import waterfall from "./waterfall"
import cast from "./castDates"
import Query from "./Query"

export interface LinkOptions {
  /**
   * Fetch API compatible function
   */
  readonly fetch?: typeof fetch

  /**
   * Fetch options
   */
  readonly fetchOptions?: RequestInit

  /**
   * ID of a filter. The ID can be found on filters page: <https://derpibooru.org/filters>
   */
  readonly filter?: string | number

  /**
   * Personal API key taken from your account settings
   */
  readonly key?: string
}

export interface CreateLinkOptions {
  /**
   * URL which is the target for link requests. Defaults to https://derpibooru.org
   */
  url?: string
  linkOptions?: LinkOptions
}

export const DEFAULT_URL = "https://derpibooru.org"

const linkDefaults: LinkOptions = {
  fetch,
  fetchOptions: {
    method: "get"
  }
}

const defaults: CreateLinkOptions = {
  url: DEFAULT_URL,
  linkOptions: linkDefaults
}

const normalize = <T>(input: T): T => camelCase<T>(input, {deep: true})

function parse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new NetworkError(`Network error: ${response.statusText}`, response)
  }

  return response.json() as Promise<T>
}

export type Link = ReturnType<typeof createLink>

/**
 * Creates a new link for target url
 */
export function createLink(options: CreateLinkOptions = {}) {
  const {url, linkOptions}: CreateLinkOptions = {
    ...defaults, ...options,

    linkOptions: {
      ...defaults?.linkOptions, ...options?.linkOptions
    }
  }

  const target = new URL(url)

  /**
   * Sends a request to Phelomena API
   */
  return async function link<T>(
    path: string[],
    query: Query,
    requestOptions?: LinkOptions
  ): Promise<T> {
    // TODO: Should probably make base endpoint configurable
    path = ["/api/v1/json", ...path].filter(Boolean)

    const {key, filter, fetch: call, fetchOptions}: LinkOptions = {
      ...linkOptions, ...requestOptions,

      fetchOptions: {
        ...linkOptions.fetchOptions, ...requestOptions?.fetchOptions
      }
    }

    if (key) {
      query.set("key", key)
    }

    if (filter) {
      query.set("filter_id", filter)
    }

    target.pathname = path.join("/").replace(/\/{2,}/g, "/")
    target.search = query.toString()

    const promise = call(target.toString(), fetchOptions)

    return waterfall([parse, normalize, cast], promise) as Promise<T>
  }
}

export default createLink
