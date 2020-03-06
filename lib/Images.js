const Entities = require("./Entities")

/**
 * @api private
 */
class Images extends Entities {
  /**
   * @param {object} options
   * @param {Dinky} options.dinky
   * @param {Function} options.link
   */
  constructor({dinky, link}) {
    super({dinky, link, path: "images"})
  }

  search(...args) {
    return super.search(...args).images()
  }
}

module.exports = Images
