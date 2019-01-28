const Request = require("./Request")

/**
 * @api private
 */
class Images extends Request {
  constructor({link, dinky, id = null, query = {}} = {}) {
    super(link, query)

    this.__dinky = dinky
    this.__id = id
  }

  async exec() {
    let endpoint = "images"

    if (this.__id != null) {
      endpoint += `/${this.__id}`
    }

    return super.exec(endpoint)
  }
}

module.exports = Images
