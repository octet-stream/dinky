const Entities = require("./Entities")

/**
 * @api private
 */
class Comments extends Entities {
  /**
   * @param {Object<string, any>} options
   * @param {Dinky} options.dinky
   * @param {Function} options.link
   */
  constructor({dinky, link}) {
    super({dinky, link, path: "comments"})
  }

  /**
   * Creates a new Search request that to /api/v1/json/search/comments
   *
   * @param {string | string[]} [query = []] – query params
   *
   * @return {Search}
   *
   * @public
   */
  search(...args) {
    return super.search(...args).comments()
  }
}

module.exports = Comments
