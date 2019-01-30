const waterfall = require("./util/waterfall")

const Request = require("./Request")

const isArray = Array.isArray

/**
 * @api private
 */
class Search extends Request {
  constructor({link, tags, dinky}) {
    super({dinky, link})

    if (tags) {
      this.tags(tags)
    }
  }

  /**
   * Adds a tag or a list of tags to current search request
   *
   * @param {string | Array<string>} list
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
   * Set how many results per page should API return
   *
   * @param {number} value – an amount of results you want to take.
   *   Must be a value in range between 1 and 50.
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
   * @public
   */
  async random() {
    this._query.set("random_image", true)

    const resolve = ({id} = {}) => (
      id != null ? this._dinky.images(id) : undefined
    )

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
    // Turn off the rule because we need to check value of any type
    // eslint-disable-next-line no-restricted-globals
    if (limit != null && isNaN(limit)) {
      throw new TypeError("You must specify the limit amount as number.")
    } else if (limit <= 1 || limit >= 50) {
      throw new TypeError("Limit must be a value in range between 1 and 50.")
    }

    return super.exec("search")
  }
}

module.exports = Search
