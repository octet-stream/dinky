const Query = require("./Query")

/**
 * @api private
 */
class Request {
  /**
   * The Request object helps to describe request to Derpibooru API.
   *
   * @param {object} options
   * @param {Dinky} options.dinky
   * @param {Function} options.link
   * @param {string} options.path
   */
  constructor({dinky, link, path}) {
    /**
     * @prop {Function} __link – request handler taken from link helper
     *
     * @private
     */
    this.__link = link

    /**
     * @prop {Dinky} _dinky – current Dinky.js inststance
     *
     * @protected
     */
    this._dinky = dinky

    /**
     * @prop {Query} _query – query search params
     *
     * @protected
     */
    this._query = new Query()

    /**
     * @prop {string[]} _path – a path where the request will be sent
     *
     * @protected
     */
    this._path = [path]

    this.exec = this.exec.bind(this)
  }

  /**
   * Sets images ordering to ascending
   *
   * @return {Request}
   *
   * @public
   */
  ascending() {
    this._query.set("order", "a")

    return this
  }

  /**
   * Sets images ordering to descending
   *
   * @return {Request}
   *
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
   * @return {Promise<object>}
   *
   * @public
   */
  async exec(options) {
    return this.__link(this._path, this._query, options)
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
