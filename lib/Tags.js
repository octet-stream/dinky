const Entities = require("./Entities")

/**
 * @api private
 */
class Tags extends Entities {
  /**
   * @param {object} options
   * @param {Dinky} options.dinky
   * @param {Function} options.link
   */
  constructor({dinky, link}) {
    super({dinky, link, path: "tags"})
  }

  /**
   * Creates a new Search request that to /api/v1/json/search/images
   *
   * @param {string | string[]} [query = []] – query params
   *
   * @return {Seqrch}
   *
   * @public
   */
  search(...args) {
    return super.search(...args).tags()
  }
}

module.exports = Tags
