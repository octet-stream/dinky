const Request = require("./Request")

/**
 * @api private
 */
class Images extends Request {
  /**
   * @param {object} options
   * @param {Dinky} options.dinky
   * @param {Function} options.link
   */
  constructor({dinky, link}) {
    super({dinky, link, path: "images"})
  }

  search(...args) {
    return super.search(...args)
  }

  /**
   * Takes an image by given ID.
   *
   * @param {number} id – image ID on Derpibooru
   *
   * @return {Promise<object>}
   *
   * @public
   */
  async id(id) {
    this._path.push(id)

    return this.exec()
  }
}

module.exports = Images
