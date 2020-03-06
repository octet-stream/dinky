const Entities = require("./Entities")

/**
 * @api private
 */
class Comments extends Entities {
  /**
   * @param {object} options
   * @param {Dinky} options.dinky
   * @param {Function} options.link
   */
  constructor({dinky, link}) {
    super({dinky, link, path: "comments"})
  }

  search(...args) {
    return super.search(...args).comments()
  }
}

module.exports = Comments
