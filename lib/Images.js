const Request = require("./Request")

/**
 * @api private
 */
class Images extends Request {
  /**
   * @oaram {object} options
   * @param {Dinky} options.dinky
   * @paran {Function} options.link
   */
  constructor({dinky, link}) {
    super({dinky, link, path: "images"})
  }

  /**
   * Takes an image by given ID.
   *
   * @param {number} id – image ID on Derpibooru
   *
   * @return {Promise<object>}
   */
  async id(id) {
    this._path.push(id)

    return this.exec()
  }
}

module.exports = Images
