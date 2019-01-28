const Request = require("./Request")

const isArray = Array.isArray

/**
 * @api private
 */
class Search extends Request {
  constructor({link, tags}) {
    super(link)

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

    if (isArray(this._query.q)) {
      this._query.q.concat(list)
    } else {
      this._query.q = Array.from(list)
    }

    return this
  }

  limit(value) {
    this._query.perpage = value

    return this
  }

  async exec() {
    if (isArray(this._query.q)) {
      this._query.q = this._query.q.join(", ")
    }

    return super.exec("search")
  }
}

module.exports = Search
