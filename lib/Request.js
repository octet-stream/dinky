/**
 * @private
 */
class Request {
  constructor(link, query = {}) {
    /**
     * @private
     */
    this.__link = link

    /**
     * @protected
     */
    this._query = query
  }

  ascending() {
    this._query.order = "a"

    return this
  }

  descending() {
    this._query.order = "d"

    return this
  }

  /**
   * Sets the page offset
   */
  page(offset = 1) {
    this._query.page = offset

    return this
  }

  /**
   * Executes current request
   *
   * @param {string} endpoint
   *
   * @return {Promise<object | Array<object>>}
   */
  async exec(endpoint) {
    return this.__link(endpoint, this._query)
  }

  then(onFulfilled, onRejected) {
    return this.exec().then(onFulfilled, onRejected)
  }

  catch(onRejected) {
    return this.exec().catch(onRejected)
  }
}

module.exports = Request
