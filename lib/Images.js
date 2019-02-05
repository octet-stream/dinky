const Request = require("./Request")

/**
 * @api private
 */
class Images extends Request {
  constructor({link, dinky}) {
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
