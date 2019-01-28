const isPlainObject = require("./util/isPlainObject")
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

  async exec(id, query = {}) {
    if (isPlainObject(id)) {
      [query, id] = [id, null]
    }

    id || (id = this.__id)

    let endpoint = "images"

    if (id != null) {
      endpoint += `/${id}`
    }

    return super.exec(endpoint, query)
  }
}

module.exports = Images
