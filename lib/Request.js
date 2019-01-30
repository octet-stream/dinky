const Query = require("./Query")

/**
 * @private
 */
class Request {
  constructor({dinky, link/* , query = {} */}) {
    /**
     * @private
     */
    this.__link = link

    /**
     * @protected
     */
    this._query = new Query(/* query */)
    this._dinky = dinky

    this.exec = this.exec.bind(this)
  }

  /**
   * @public
   */
  ascending() {
    this._query.set("order", "a")

    return this
  }

  /**
   * @public
   */
  descending() {
    this._query.set("order", "d")

    return this
  }

  /**
   * Sets the page offset
   *
   * @param {number} [offset = 1]
   *
   * @return {Request}
   *
   * @public
   */
  page(offset = 1) {
    this._query.set("page", offset)

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

  /**
   * @public
   */
  then(onFulfilled, onRejected) {
    return this.exec().then(onFulfilled, onRejected)
  }

  /**
   * @public
   */
  catch(onRejected) {
    return this.exec().catch(onRejected)
  }
}

module.exports = Request
