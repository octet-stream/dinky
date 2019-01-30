const waterfall = require("./util/waterfall")

const Request = require("./Request")

const isArray = Array.isArray

/**
 * @api private
 */
class Search extends Request {
  constructor({link, tags, dinky}) {
    super(dinky, link)

    if (tags) {
      this.tags(tags)
    }
  }

  /**
   * Adds a tag or a list of tags to current search request
   *
   * @params {string | Array<string>} list
   */
  tags(list) {
    if (!isArray(list)) {
      list = [list]
    }

    let query = this._query.get("q")

    if (isArray(query)) {
      query.concat(list)
    } else {
      query = Array.from(list)
    }

    this._query.set("q", query)

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

  async random() {
    this._query.set("random_image", true)

    const resolve = ({id} = {}) => (
      id != null ? this._dinky.images(id) : undefined
    )

    return waterfall([this.exec, resolve])
  }

  async exec() {
    const query = this._query.get("q")

    if (isArray(query)) {
      this._query.set("q", query.join(", "))
    }

    // Turn off the rule because we need to check value of any type
    // eslint-disable-next-line no-restricted-globals
    // if (this._query.perpage != null && isNaN(this._query.perpage)) {
    //   throw new TypeError("You must specify the .limit() amount as number.")
    // }

    return super.exec("search")
  }
}

module.exports = Search
