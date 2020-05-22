const flat = require("./util/flat")

const Request = require("./Request")

const {isArray} = Array

/**
 * @typedef {import("./Dinky").DinkyRequestOptions} DinkyRequestOptions
 * @typedef {import("./Dinky")} Dinky
 */

/**
 * @api private
 */
class Search extends Request {
  /**
   * @param {object} options
   * @param {Dinky} options.dinky
   * @param {Function} options.link
   * @param {string[] | string} [options.query = []]
   */
  constructor({dinky, link, query = []}) {
    super({dinky, link, path: "search"})

    if (query.length > 0) {
      this.query(...query)
    }

    this.__type = "images"
  }

  /**
   * Sets the search type to given value
   *
   * @param {string} searchType
   *
   * @return {Search}
   *
   * @private
   */
  __setType(searchType) {
    this.__type = searchType

    return this
  }

  /**
   * Sets Search type to "comments"
   *
   * @return {Search}
   *
   * @public
   */
  comments() {
    return this.__setType("comments")
  }

  /**
   * Sets Search type to "galleries"
   *
   * @return {Search}
   *
   * @public
   */
  galleries() {
    return this.__setType("galleries")
  }

  /**
   * Sets Search type to "posts"
   *
   * @return {Search}
   *
   * @public
   */
  posts() {
    return this.__setType("posts")
  }

  /**
   * Sets Search type to "tags"
   *
   * @return {Search}
   *
   * @public
   */
  tags() {
    return this.__setType("tags")
  }

  /**
   * Sets Search type to "images"
   *
   * @return {Search}
   *
   * @public
   */
  images() {
    return this.__setType("images")
  }

  /**
   * Appends a tag or a list of tags to the current search request
   *
   * @param {string | string[]} [list = []] – a tag or a list of tags
   *   you want to append
   *
   * @public
   */
  query(...list) {
    list = flat(list)

    // Do not set tags if no such given
    if (list.length < 1) {
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
   * Note that this method requires user's key.
   *
   * @return {Search}
   *
   * @public
   */
  faves() {
    return this.query("my:faves")
  }

  /**
   * Sets my:watched param to the search request.
   *
   * Note that this method requires user's key.
   *
   * @return {Search}
   *
   * @public
   */
  watched() {
    return this.query("my:watched")
  }

  /**
   * Sets my:upvotes param to the search request.
   *
   * Note that this method requires user's key.
   *
   * @return {Search}
   *
   * @public
   */
  upvotes() {
    return this.query("my:upvotes")
  }

  /**
   * Sets my:downvotes param to the search request.
   *
   * Note that this method requires user's key.
   *
   * @return {Search}
   *
   * @public
   */
  downvotes() {
    return this.query("my:downvotes")
  }

  /**
   * Sets my:uploads param to the search request.
   *
   * Note that this method requires user's key.
   *
   * @return {Search}
   *
   * @public
   */
  uploads() {
    return this.query("my:uploads")
  }

  /**
   * Search for the images faved by given user.
   *
   * @param {string} user – name of the user on Derpibooru
   *
   * @return {Search}
   *
   * @public
   */
  favedBy(user) {
    return this.query(`faved_by:${user}`)
  }

  /**
   * Search for images uploaded by specified user
   *
   * @param {string} user – name of the user on Derpibooru
   *
   * @return {Search}
   *
   * @public
   */
  uploadedBy(user) {
    return this.query(`uploader:${user}`)
  }

  /**
   * Specifies how many images per page should API return.
   *
   * @param {number} value – an amount of images you want to take.
   *   The value must be in range of 1 and 50.
   *
   * @return {Search}
   *
   * @public
   */
  limit(value) {
    this._query.set("per_page", value)

    return this
  }

  /**
   * Sets the MINIMAL score of requested images.
   *
   * @param {number} value – a value of minimal score
   *
   * @return {Search}
   *
   * @public
   */
  minScore(value) {
    this._query.set("min_score", value)

    return this
  }

  /**
   * Sets the MAXIMAL score of requested images.
   *
   * @param {number} value – a value of maximal score
   *
   * @return {Search}
   *
   * @public
   */
  maxScore(value) {
    this._query.set("max_score", value)

    return this
  }

  /**
   * Sets images ordering to ascending.
   *
   * @return {Search}
   *
   * @public
   */
  ascending() {
    this._query.set("sd", "asc")

    return this
  }

  /**
   * Sets images ordering to descending.
   *
   * @return {Search}
   *
   * @public
   */
  descending() {
    this._query.set("sd", "desc")

    return this
  }

  /**
   * Adds a param to sort result by given field.
   *
   * @param {string} field
   *
   * @return {Search}
   *
   * @public
   */
  sortBy(field) {
    this._query.set("sf", field)

    return this
  }

  /**
   * If been called, the API will return random image.
   *
   * @return {Search}
   *
   * @public
   */
  random() {
    return this.sortBy("random")
  }

  /**
   * Executes current search request.
   *
   * @param {DinkyRequestOptions} [options]
   *
   * @return {Promise<object>}
   *
   * @public
   */
  async exec(options) {
    const params = this._query.get("q")
    if (isArray(params) && params.length > 0) {
      this._query.set("q", params.join(","))
    } else if (this._query.get("sf") === "random") {
      // Add wildcard when searching for random image,
      // but no tags has been set
      this._query.set("q", "*")
    }

    this._path.push(this.__type)

    return super.exec(options)
  }
}

module.exports = Search
