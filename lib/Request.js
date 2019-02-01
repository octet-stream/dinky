const Query = require("./Query")

/**
 * @api private
 */
class Request {
  /**
   * Creates a new Request instance
   *
   * @param {object} options
   * @param {string} options.path
   */
  constructor({dinky, link, path/* , query = {} */}) {
    /**
     * @private
     */
    this.__link = link

    /**
     * @protected
     */
    this._dinky = dinky // Current Dinky.js inststance
    this._query = new Query(/* query */) // e. g. URLSearchParams
    this._path = [path] // A path to where request will be sent

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
   * @return {Promise<object | Array<object>>}
   *
   * @public
   */
  async exec() {
    return this.__link(this._path.join("/"), this._query)
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
