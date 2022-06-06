import type {BaseSearchOptions} from "./Search.js"
import type {LinkOptions} from "../util/link.js"
import {Search} from "./Search.js"

export interface SearchImagesOptions extends BaseSearchOptions { }

/**
 * Implements `images` search interface
 *
 * Endpoint `/api/v1/json/search/images`
 */
export class SearchImages extends Search<"images"> {
  constructor(options: SearchImagesOptions = {}) {
    super({...options, type: "images"})
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
   * @param value An amount of entities you want to take.
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
    // Override search type to "reserve" so request will be send to the right search endpoint
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
    // Add wildcard when searching for random image, without any search params
    if (this._query.get("sf") === "random" && !this._query.has("q")) {
      this._query.set("q", "*")
    }

    return super.exec(options)
  }
}
