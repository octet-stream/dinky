const Entities = require("./Entities")

/**
 * @typedef {import("./Dinky")} Dinky
 * @typedef {import("./Dinky").DinkyRequestOptions} DinkyRequestOptions
 * @typedef {import("./Search")} Search
 */

/**
 * @api private
 */
class Images extends Entities {
  /**
   * @param {Object} options
   * @param {Dinky} options.dinky
   * @param {Function} options.link
   */
  constructor({dinky, link}) {
    super({dinky, link, path: "images"})
  }

  /**
   * Creates a new Search request that to /api/v1/json/search/images
   *
   * @param {string | string[]} [query = []] – query params
   *
   * @return {Search}
   *
   * @public
   */
  search(...args) {
    return super.search(...args).images()
  }

  /**
   * Get a featured image
   *
   * @param {DinkyRequestOptions} options
   *
   * @return {Promise<Object<string, any>>}
   */
  featured(options) {
    this._path.push("featured")

    return this.exec(options)
  }
}

module.exports = Images
