const Request = require("./Request")

/**
 * @api private
 */
class Images extends Request {
  constructor({link, dinky, query = null} = {}) {
    super({dinky, link, query, path: "images"})
  }

  async id(id) {
    this._path.push(id)

    return this.exec()
  }
}

module.exports = Images
