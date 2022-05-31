import type {RequestOptionsWithoutPath as Options} from "./Request.js"
import {Request} from "./Request.js"

import r from "./responses"

import type {LinkOptions} from "./util/link.js"

const {isArray} = Array

/**
 * Available types of the Search responses
 */
export type SearchTypes =
  | "comments"
  | "galleries"
  | "posts"
  | "tags"
  | "images"

/**
 * Available Search responses
 */
export interface SearchTypesMap {
  comments: r.Comment
  galleries: r.Gallery
  posts: r.Post
  tags: r.Tag
  images: r.Image
}

/**
 * Additional Search options
 */
export interface SearchOptions<T extends SearchTypes> extends Options {
  /**
   * Indicates the type of search request
   */
  readonly type?: T
}

/**
 * Default Search type
 */
export const DEFAULT_SEARCH_TYPE: SearchTypes = "images"

type DefaultSearchType = typeof DEFAULT_SEARCH_TYPE

export class Search<
  T extends SearchTypes = DefaultSearchType
> extends Request<SearchTypesMap[T]> {
  protected _type: string

  constructor({type, url, link, linkOptions}: SearchOptions<T> = {}) {
    super({url, link, linkOptions, path: "search"})

    this._type = type ?? DEFAULT_SEARCH_TYPE
  }

  /**
   * Add a tag or set of tags to the request
   *
   * @param list A list of tags
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
   * With a few tags to search
   *
   * ```js
   * import {Search} from "dinky.js"
   *
   * const search = new Search()
   *
   * search.query("princess luna", "moonstuck")
   * ```
   *
   * With a few tags, applied as a single array
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

  /**
   * Sets my:faves param to the search request.
   *
   * **Note that this method requires user's key.**
   */
  faves() {
    return this.query("my:faves")
  }

  /**
   * Sets my:watched param to the search request.
   *
   * **Note that this method requires user's key.**
   */
  watched() {
    return this.query("my:watched")
  }

  /**
   * Sets my:upvotes param to the search request.
   *
   * **Note that this method requires user's key.**
   */
  upvotes() {
    return this.query("my:upvotes")
  }

  /**
   * Sets my:downvotes param to the search request.
   *
   * **Note that this method requires user's key.**
   */
  downvotes() {
    return this.query("my:downvotes")
  }

  /**
   * Sets my:uploads param to the search request.
   *
   * **Note that this method requires user's key.**
   */
  uploads() {
    return this.query("my:uploads")
  }

  /**
   * Search for the images faved by given user.
   *
   * @param user Name of the user on booru
   */
  favedBy(user: string) {
    return this.query(`faved_by:${user}`)
  }

  /**
   * Search for images uploaded by specified user
   *
   * @param user Name of the user on booru
   */
  uploadedBy(user: string) {
    return this.query(`uploader:${user}`)
  }

  /**
   * Specifies how many entities per page API will return.
   *
   * @param {number} value An amount of entities you want to take.
   */
  limit(value: number): this {
    this._query.set("per_page", value)

    return this
  }

  /**
   * Sets the **minimal** score of requested images.
   *
   * @param value A value of minimal score
   */
  minScore(value: number): this {
    this._query.set("min_score", value)

    return this
  }

  /**
   * Sets the **maximal** score of requested images.
   *
   * @param value A value of maximal score
   */
  maxScore(value: number): this {
    this._query.set("max_score", value)

    return this
  }

  /**
   * Sets images ordering to **ascending**.
   */
  ascending(): this {
    this._query.set("sd", "asc")

    return this
  }

  /**
   * Sets images ordering to **descending**.
   */
  descending(): this {
    this._query.set("sd", "desc")

    return this
  }

  /**
   * Adds a param to sort result by given field.
   *
   * @param field
   */
  sortBy(field: string): this {
    this._query.set("sf", field)

    return this
  }

  /**
   * Sets the "sf" (sort field) parameter to "random"
   */
  random() {
    return this.sortBy("random")
  }

  /**
   * Executes reverse-searching the image given by the url query parameter.
   *
   * @param url The URL of image
   * @param options Request options
   *
   * @example
   *
   * ```
   * const search = new Search()
   *
   * await search.reverse("https://derpicdn.net/img/2019/12/24/2228439/full.jpg")
   * ```
   */
  reverse(url: string, options?: LinkOptions) {
    this._type = "reverse"

    this._query.set("url", url)

    return this.exec(options)
  }

  /**
   * Commits current search request.
   * This method will be called implicitly once you use `await`, `.then()` or `.catch()` to perform the request.
   * You'll probably need to call it only if you want to pass per-request options.
   *
   * @param options
   *
   * @example
   * ```
   * const search = new Search()
   *
   * search.query("princess luna", "scootaloo", "sleepless in ponyville")
   *
   * await search.exec()
   * ```
   */
  async exec(options?: LinkOptions) {
    const params = this._query.get("q") as string[]
    if (isArray(params) && params.length > 0) {
      this._query.set("q", params.join(","))
    } else if (this._query.get("sf") === "random") {
      // Add wildcard when searching for random image,
      // but no tags has been set
      this._query.set("q", "*")
    }

    this._path[1] = this._type

    return super.exec(options)
  }
}

export const search = <T extends SearchTypes = DefaultSearchType>(
  options?: SearchOptions<T>
) => new Search<T>(options)
