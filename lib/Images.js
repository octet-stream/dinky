const Request = require("./Request")

/**
 * @api private
 */
class Images extends Request {
  constructor({link, dinky, id = null, query = null} = {}) {
    super({dinky, link, query})

    /**
     * @private
     */
    this.__id = id
  }

  /**
   * @public
   */
  async exec() {
    let endpoint = "images"

    if (this.__id != null) {
      endpoint += `/${this.__id}`
    }

    return super.exec(endpoint)
  }
}

module.exports = Images
