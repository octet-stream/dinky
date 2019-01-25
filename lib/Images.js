const Request = require("./Request")

const assign = Object.assign

/**
 * @api private
 */
class Images extends Request {
  constructor({link, dinky, params = {}} = {}) {
    super(link, params)

    this.__dinky = dinky
  }

  async exec(params = {}) {
    const {id = null} = assign({}, this.__params, params)

    let endpoint = "images"

    if (id) {
      endpoint += `/${id}`
    }

    return super.exec(endpoint)
  }
}

module.exports = Images
