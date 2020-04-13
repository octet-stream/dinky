const Query = require("./Query")

const {isArray} = Array

/**
 * @typedef {import("./Dinky")} Dinky
 * @typedef {import("./Dinky").DinkyRequestOptions} DinkyRequestOptions
 */

/**
 * @api private
 */
class Request {
  /**
   * The Request object helps to describe request to Derpibooru API.
   *
   * @param {Object} options
   * @param {Dinky} options.dinky
   * @param {Function} options.link
   * @param {string} options.path
   */
  constructor({dinky, link, path}) {
    /**
     * Request handler taken from link helper.
     *
     * @type {Function}
     *
     * @private
     */
    this.__link = link

    /**
     * Current Dinky.js inststance.
     *
     * @type {Dinky}
     *
     * @protected
     */
    this._dinky = dinky

    /**
     * Query search params.
     *
     * @type {Query}
     *
     * @protected
     */
    this._query = new Query()

    /**
     * A path where the request will be sent.
     *
     * @type {string[]}
     *
     * @protected
     */
    this._path = isArray(path) ? path : [path]

    this.exec = this.exec.bind(this)
  }

  /**
   * Sets the page offset.
   *
   * @param {number} [offset = 1]
   *
   * @return {Request}
   *
   * @public
   * @method
   */
  page(offset = 1) {
    this._query.set("page", offset)

    return this
  }

  /**
   * Executes current request.
   *
   * @param {DinkyRequestOptions} [options = {}]
   *
   * @return {Promise<object>}
   *
   * @public
   * @method
   */
  async exec(options) {
    return this.__link(this._path, this._query, options)
  }

  /**
   * @public
   * @method
   */
  then(onFulfilled, onRejected) {
    return this.exec().then(onFulfilled, onRejected)
  }

  /**
   * @public
   * @method
   */
  catch(onRejected) {
    return this.exec().catch(onRejected)
  }
}

module.exports = Request
