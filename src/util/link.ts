import {URL} from "url"

import fetch from "isomorphic-fetch"
import camelCase from "camelcase-keys"

import TypedObject from "../type/TypedObject"

import NetworkError from "./NetworkError"
import waterfall from "./waterfall"
import cast from "./castDates"
import Query from "./Query"

export interface LinkOptions {
  /**
   * Fetch API compatible function
   */
  readonly fetch: typeof fetch

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

const defaults: LinkOptions = {
  fetch,
  fetchOptions: {
    method: "get"
  }
}

export const DEFAULT_URL = "https://derpibooru.org"

const normalize = <
  T extends TypedObject = TypedObject
>(input: T): T => camelCase<T>(input, {deep: true})

function parse<
  R extends TypedObject = TypedObject
>(response: Response): Promise<R> {
  if (!response.ok) {
    throw new NetworkError(`Network error: ${response.statusText}`, response)
  }

  return response.json() as Promise<R>
}

/**
 * Creates a new link for target url
 *
 * @param url URL which is the target for link requests. Defaults to https://derpibooru.org
 * @param options Link options
 */
export function createLink(url: string = DEFAULT_URL, options?: LinkOptions) {
  options = {
    ...defaults, ...options,

    fetchOptions: {
      ...defaults.fetchOptions, ...options?.fetchOptions
    }
  }

  const target = new URL(url)

  /**
   * Sends a request to Phelomena API
   */
  return async function link<R extends TypedObject = TypedObject>(
    path: string[],
    query: Query,
    requestOptions?: LinkOptions
  ): Promise<R> {
    // TODO: Should probably make base endpoint configurable
    path = ["/v1/json", ...path].filter(Boolean)

    const {key, filter, fetch: call, fetchOptions} = {
      ...options, ...requestOptions,

      fetchOptions: {
        ...options.fetchOptions, ...requestOptions?.fetchOptions
      }
    } as LinkOptions

    if (key) {
      query.set("key", key)
    }

    if (filter) {
      query.set("filter_id", filter)
    }

    target.pathname = path.join("/").replace(/\/{2,}/g, "/")
    target.search = query.toString()

    const promise = call(target.toString(), fetchOptions)

    return waterfall([parse, normalize, cast], promise) as Promise<R>
  }
}

export default createLink
