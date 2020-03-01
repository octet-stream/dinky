const Request = require("./Request")

/**
 * @api private
 */
class Comments extends Request {
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

  /**
   * Takes an comment by given ID.
   *
   * @param {number} id – comment ID on Derpibooru
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

module.exports = Comments
