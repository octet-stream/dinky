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

  search(...args) {
    return super.search(...args).tags()
  }
}

module.exports = Tags
