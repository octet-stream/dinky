const Request = require("./Request")

/**
 * @api private
 */
class Entities extends Request {
  search(...args) {
    return this._dinky.search(...args)
  }

  /**
   * Get one entity by its ID
   *
   * @param {number} id
   * @param {object} [options = {}]
   *
   * @return {Promise<object>}
   */
  getOne(id, options) {
    this._path.push(id)

    return this.exec(options)
  }

  // DEPRECATED
  id(id, options) {
    return this.getOne(id, options)
  }
}

module.exports = Entities
