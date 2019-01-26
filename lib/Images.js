const Request = require("./Request")

const assign = Object.assign

/**
 * @api private
 */
class Images extends Request {
  constructor({link, dinky, query = {}} = {}) {
    super(link, query)

    this.__dinky = dinky
  }

  async exec(query = {}) {
    const {id = null, ...others} = assign({}, this.__query, query)

    let endpoint = "images"

    if (id) {
      endpoint += `/${id}`
    }

    return super.exec(endpoint, others)
  }

  setId(id) {
    this.__query.id = id

    return this
  }
}

module.exports = Images
