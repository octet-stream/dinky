const Request = require("./Request")

/**
 * @api private
 */
class Entities extends Request {
  /**
   * Creates a new Search request for given query
   *
   * @param {string | string[]} [query = []] – query params
   *
   * @return {Seqrch}
   *
   * @public
   */
  search(...query) {
    return this._dinky.search(...query)
  }

  /**
   * Get one entity by its ID
   *
   * @param {number} id
   * @param {object} [options = {}]
   *
   * @return {Promise<object>}
   *
   * @public
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
