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
   * @params {object} options
   *
   * @return {Promise<object>}
   */
  featured(options) {
    this._path.push("featured")

    return this.exec(options)
  }
}

module.exports = Images
