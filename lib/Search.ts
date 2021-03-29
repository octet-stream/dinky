import {Request, RequestOptionsWithoutPath} from "./Request"

import {LinkOptions} from "./util/link"

import flat from "./util/flat"

const {isArray} = Array

export type SearchTypes =
  | "comments"
  | "galleries"
  | "posts"
  | "tags"
  | "images"

export interface SearchOptions extends RequestOptionsWithoutPath {
  /**
   * Indicates the type of search request
   */
  readonly type?: SearchTypes
}

export const DEFAULT_SEARCH_TYPE: SearchTypes = "images"

export class Search<T> extends Request<T> {
  protected _type: string

  constructor({type, url, link, linkOptions}: SearchOptions = {}) {
    super({url, link, linkOptions, path: "search"})

    this._type = type ?? DEFAULT_SEARCH_TYPE
  }

  /**
   * Add a tag or set of tags to the request
   *
   * @param list A list of tags
   */
  query(...list: Array<string[] | string>): this {
    list = flat(list)

    if (!list.length) {
      return this
    }

    let params = this._query.get("q") as string[]

    if (isArray(params)) {
      params = params.concat(list as string[])
    } else {
      params = Array.from(list as string[])
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
   * @param {string} field
   */
  sortBy(field: string): this {
    this._query.set("sf", field)

    return this
  }

  /**
   * Sets the "sf" parameter to "random"
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
  reverse<T>(url: string, options?: LinkOptions): Promise<T> {
    this._type = "reverse"

    this._query.set("url", url)

    return this.exec<T>(options)
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
  async exec<T>(options?: LinkOptions) {
    const params = this._query.get("q") as string[]
    if (isArray(params) && params.length > 0) {
      this._query.set("q", params.join(","))
    } else if (this._query.get("sf") === "random") {
      // Add wildcard when searching for random image,
      // but no tags has been set
      this._query.set("q", "*")
    }

    this._path[1] = this._type

    return super.exec<T>(options)
  }
}
