const waterfall = require("./util/waterfall")
const flat = require("./util/flat")

const Request = require("./Request")

const isArray = Array.isArray

/**
 * @api private
 */
class Search extends Request {
  /**
   * @param {object} options
   * @param {Dinky} dinky
   * @param {Function} options.link
   * @param {string[] | string} [options.tags = []]
   */
  constructor({dinky, link, tags = []}) {
    super({dinky, link, path: "search"})

    if (tags.length > 0) {
      this.tags(...tags)
    }
  }

  /**
   * Appends a tag or a list of tags to the current search request
   *
   * @param {string | string[]} [list = []] – a tag or a list of tags
   *   you want to append
   *
   * @public
   */
  tags(...list) {
    list = flat(list)

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
   * Sets my:faves param to the search request
   *
   * Note that this method reques user's key.
   *
   * @return {Search}
   */
  faves() {
    return this.tags("my:faves")
  }

  /**
   * Sets my:watched param to the search request
   *
   * Note that this method reques user's key.
   *
   * @return {Search}
   */
  watched() {
    return this.tags("my:watched")
  }

  /**
   * Sets my:upvotes param to the search request
   *
   * Note that this method reques user's key.
   *
   * @return {Search}
   */
  upvotes() {
    return this.tags("my:upvotes")
  }

  /**
   * Sets my:downvotes param to the search request
   *
   * Note that this method reques user's key.
   *
   * @return {Search}
   */
  downvotes() {
    return this.tags("my:downvotes")
  }

  /**
   * Sets my:uploads param to the search request
   *
   * Note that this method reques user's key.
   *
   * @return {Search}
   */
  uploads() {
    return this.tags("my:uploads")
  }

  /**
   * Search for the images faved by given user
   *
   * @param {string} user – name of the user on Derpibooru
   *
   * @return {Search}
   */
  favedBy(user) {
    return this.tags(`faved_by:${user}`)
  }

  /**
   * Search for images uploaded by specified user
   *
   * @param {string} user – name of the user on Derpibooru
   *
   * @return {Search}
   */
  uploadedBy(user) {
    return this.tags(`uploader:${user}`)
  }

  /**
   * Specifies how many images per page should API return
   *
   * @param {number} value – an amount of images you want to take.
   *   The value must be in range of 1 and 50.
   *
   * @return {Search}
   *
   * @public
   */
  limit(value) {
    this._query.set("perpage", value)

    return this
  }

  /**
   * Sets the MINIMAL score of requested images
   *
   * @param {number} value – a value of minimal socre
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
   * Sets the MAXIMAL score of requested images
   *
   * @param {number} value – a value of maximal socre
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
   * Sets images ordering to ascending
   *
   * @return {Request}
   *
   * @public
   */
  ascending() {
    this._query.set("sd", "asc")

    return this
  }

  /**
   * Sets images ordering to descending
   *
   * @return {Request}
   *
   * @public
   */
  descending() {
    this._query.set("sd", "desc")

    return this
  }

  sortBy(field) {
    this._query.set("sf", field)

    return this
  }

  /**
   * If been called, the API will return random image.
   *
   * @return {Promise<object | undefined>}
   *
   * @public
   */
  async random() {
    this._query.set("random_image", true)

    const resolve = image => {
      if (image && image.id != null) {
        return this._dinky.images().id(image.id)
      }

      return undefined
    }

    return waterfall([this.exec, resolve])
  }

  /**
   * Executes current search request
   *
   * @return {Promise<object>}
   *
   * @public
   */
  async exec(options) {
    const params = this._query.get("q")
    if (isArray(params)) {
      this._query.set("q", params.join(","))
    }

    const limit = this._query.get("perpage")
    if (limit != null) {
      // Turn off the rule because we need to check value of any type
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(limit)) {
        throw new TypeError("You must specify the limit amount as number.")
      }

      if (limit <= 1 || limit >= 50) {
        throw new RangeError("Limit must be a value in range between 1 and 50.")
      }
    }

    const min = this._query.get("min_score")
    // eslint-disable-next-line no-restricted-globals
    if (min != null && isNaN(min)) {
      throw new TypeError("You must specify minimal score as a number.")
    }

    const max = this._query.get("max_score")
    // eslint-disable-next-line no-restricted-globals
    if (max != null && isNaN(max)) {
      throw new TypeError("You must specify maximal score as a number.")
    }

    return super.exec(options)
  }
}

module.exports = Search
