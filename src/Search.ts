import {Request} from "./Request"

import {Link, LinkOptions} from "./util/link"

import flat from "./util/flat"

const {isArray} = Array

export interface SearchOptions {
  link?: Link
  query?: string[],
  type?: SearchTypes
}

export type SearchTypes = "comments"
  | "galleries"
  | "posts"
  | "tags"
  | "images"

export const DEFAULT_SEARCH_TYPE: SearchTypes = "images"

export class Search<T> extends Request<T> {
  private _type: SearchTypes = DEFAULT_SEARCH_TYPE

  constructor({query, link}: SearchOptions = {}) {
    super({link, path: "search"})

    if (query.length) {
      this.query(query)
    }
  }

  private _setType(searchType: SearchTypes): this {
    this._type = searchType

    return this
  }

  comments() {
    return this._setType("comments")
  }

  galleries() {
    return this._setType("galleries")
  }

  posts() {
    return this._setType("posts")
  }

  tags() {
    return this._setType("tags")
  }

  images() {
    return this._setType("images")
  }

  query(...list: Array<string[] | string>): this {
    list = flat(list)

    if (!list.length) {
      return this
    }

    let params = this._query.get("q")

    if (isArray(params)) {
      params = params.concat(list)
    } else {
      params = Array.from(list)
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
    return this.query(["my:faves"])
  }

  /**
   * Sets my:watched param to the search request.
   *
   * **Note that this method requires user's key.**
   */
  watched() {
    return this.query(["my:watched"])
  }

  /**
   * Sets my:upvotes param to the search request.
   *
   * **Note that this method requires user's key.**
   */
  upvotes() {
    return this.query(["my:upvotes"])
  }

  /**
   * Sets my:downvotes param to the search request.
   *
   * **Note that this method requires user's key.**
   */
  downvotes() {
    return this.query(["my:downvotes"])
  }

  /**
   * Sets my:uploads param to the search request.
   *
   * **Note that this method requires user's key.**
   */
  uploads() {
    return this.query(["my:uploads"])
  }

  /**
   * Search for the images faved by given user.
   *
   * @param user Name of the user on booru
   */
  favedBy(user: string) {
    return this.query([`faved_by:${user}`])
  }

  /**
   * Search for images uploaded by specified user
   *
   * @param user – name of the user on booru
   */
  uploadedBy(user: string) {
    return this.query([`uploader:${user}`])
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
   * @param value – a value of maximal score
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
   * If been called, the API will return random image.
   */
  random() {
    return this.sortBy("random")
  }

  /**
   * Executes current search request.
   *
   * @param {DinkyRequestOptions} [options]
   */
  async exec<T>(options?: LinkOptions) {
    const params = this._query.get("q")
    if (isArray(params) && params.length > 0) {
      this._query.set("q", params.join(","))
    } else if (this._query.get("sf") === "random") {
      // Add wildcard when searching for random image,
      // but no tags has been set
      this._query.set("q", "*")
    }

    this._path.push(this._type)

    return super.exec<T>(options)
  }
}
