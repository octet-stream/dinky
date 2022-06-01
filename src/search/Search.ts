import type {RequestOptionsWithoutPath} from "../Request.js"

/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-redeclare */
import {Request} from "../Request.js"

import r from "../responses"

import type {LinkOptions} from "../util/link.js"

const {isArray} = Array

/**
 * Available types of the Search responses
 */
export type SearchType =
  | "comments"
  | "galleries"
  | "posts"
  | "tags"
  | "images"

/**
 * Available Search responses
 */
export interface SearchResponses {
  comments: r.CommentsResponse
  galleries: r.GalleriesResponse
  posts: r.PostsResponse
  tags: r.TagsResponse
  images: r.ImagesResponse
}

/**
 * Alias for SearchResponses
 */
type SR = SearchResponses

export interface BaseSearchOptions extends RequestOptionsWithoutPath { }

/**
 * Additional Search options
 */
export interface SearchOptions<T extends SearchType> extends BaseSearchOptions {
  /**
   * Indicates the type of search request
   */
  readonly type: T
}

export abstract class Search<T extends SearchType> extends Request<SR[T]> {
  protected _type: string

  constructor({type, url, link, linkOptions}: SearchOptions<T>) {
    super({url, link, linkOptions, path: "search"})

    this._type = type
  }

  /**
   * Add one or more parameters for seach query.
   *
   * @param list A list of search parameters
   *
   * Basic example
   *
   * ```js
   * import {Search} from "dinky.js"
   *
   * const search = new Search()
   *
   * search.query("princess luna")
   * ```
   * With a few params to search
   *
   * ```js
   * import {Search} from "dinky.js"
   *
   * const search = new Search()
   *
   * search.query("princess luna", "moonstuck")
   * ```
   *
   * With a few params, applied as a single array
   *
   * ```js
   * import {Search} from "dinky.js"
   *
   * const search = new Search()
   *
   * search.query(["princess luna", "moonstuck"])
   * ```
   */
  query(...list: Array<string[] | string>): this {
    const flatList = list.flat()

    if (!flatList.length) {
      return this
    }

    let params = this._query.get<string[]>("q")

    if (isArray(params)) {
      params = params.concat(flatList)
    } else {
      params = flatList
    }

    this._query.set("q", params)

    return this
  }

  exec(options?: LinkOptions): Promise<SR[T]> {
    const params = this._query.get("q")
    if (isArray(params) && params.length > 0) {
      this._query.set("q", params.join(","))
    }

    this._path[1] = this._type

    return super.exec(options)
  }
}
