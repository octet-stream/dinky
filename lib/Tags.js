const Request = require("./Request")

/**
 * @api private
 */
class Tags extends Request {
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

  /**
   * Takes an tag by given ID.
   *
   * @param {number} id – tag ID on Derpibooru
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

module.exports = Tags
