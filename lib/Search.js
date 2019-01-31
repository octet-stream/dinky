const waterfall = require("./util/waterfall")

const Request = require("./Request")

const isArray = Array.isArray

/**
 * @api private
 */
class Search extends Request {
  constructor({link, tags, dinky}) {
    super({dinky, link, path: "search"})

    if (tags) {
      this.tags(tags)
    }
  }

  /**
   * Appends a tag or a list of tags to the current search request
   *
   * @param {string | string[]} list – a tag or a list of tags
   *   you want to append
   *
   * @public
   */
  tags(list) {
    if (!isArray(list)) {
      list = [list]
    }

    let params = this._query.get("q")

    if (isArray(params)) {
      params.concat(list)
    } else {
      params = Array.from(list)
    }

    this._query.set("q", params)

    return this
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
   * If been called, the API will return random image
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
   * @public
   */
  async exec() {
    const params = this._query.get("q")
    if (isArray(params)) {
      this._query.set("q", params.join(", "))
    }

    const limit = this._query.get("perpage")
    if (limit != null) {
      // Turn off the rule because we need to check value of any type
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(limit)) {
        throw new TypeError("You must specify the limit amount as number.")
      }

      if (limit <= 1 || limit >= 50) {
        throw new TypeError("Limit must be a value in range between 1 and 50.")
      }
    }

    return super.exec()
  }
}

module.exports = Search
