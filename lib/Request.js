const Query = require("./Query")

/**
 * @private
 */
class Request {
  /**
   * Creates a new Request instance
   *
   * @param {object} options
   * @param {string} options.path
   *
   */
  constructor({dinky, link, path/* , query = {} */}) {
    /**
     * @private
     */
    this.__link = link

    /**
     * @protected
     */
    this._dinky = dinky
    this._query = new Query(/* query */)
    this._path = [path]

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
   */
  async exec() {
    return this.__link(this._path.join(), this._query)
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
