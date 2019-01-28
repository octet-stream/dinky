const isPlainObject = require("./util/isPlainObject")
const Request = require("./Request")

/**
 * @api private
 */
class Images extends Request {
  constructor({link, dinky, query = {}} = {}) {
    super(link, query)

    this.__dinky = dinky
  }

  async exec(id, query = {}) {
    if (isPlainObject(id)) {
      [query, id] = [id, null]
    }

    let endpoint = "images"

    if (id) {
      endpoint += `/${id}`
    }

    return super.exec(endpoint, query)
  }
}

module.exports = Images
