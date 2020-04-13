const NetworkError = require("./util/NetworkError")
const apply = require("./util/selfInvokingClass")
const createLink = require("./util/link")
const proxy = require("./util/proxy")

const Comments = require("./Comments")
const Images = require("./Images")
const Search = require("./Search")
const Lists = require("./Lists")
const Tags = require("./Tags")

/**
 * @typedef {Object} DinkyRequestOptions
 *
 * @prop {string} key User's personal API key taken from their account
 * @prop {number} filter An ID of a filter found on filters page.
 *   The ID can be found on filters page: <https://derpibooru.org/filters>
 */
/**
 * @typedef {import("./Images")} Images
 * @typedef {import("./Search")} Search
 * @typedef {import("./Comments")} Comments
 * @typedef {import("./Lists")} Lists
 * @typedef {import("./Tags")} Tags
 */

/**
 * @api public
 */
class Dinky {
  /**
   * JavaScript bindings for Derpibooru API
   *
   * @param {DinkyRequestOptions} [options = {}] Global request options
   */
  constructor(options = {}) {
    /**
     * @prop {Function} __link fetch-compatible HTTP client
     *
     * @private
     */
    this.__link = createLink(options)
  }

  /**
   * Creates a request handler for /api/v1/json/search
   *
   * @param {string | string[]} [query = []] – query params
   *
   * @return {Search}
   *
   * @public
   */
  search(...query) {
    return new Search({link: this.__link, dinky: this, query})
  }

  /**
   * Creates a request handler for /api/v1/json/comments
   *
   * @return {Comments}
   *
   * @public
   */
  comments() {
    return new Comments({link: this.__link, dinky: this})
  }

  /**
   * Creates a request handler for /api/v1/json/tags
   *
   * @return {Tags}
   *
   * @public
   */
  tags() {
    return new Tags({link: this.__link, dinky: this})
  }

  /**
   * Creates a request handler for /api/v1/json/images
   *
   * @return {Images}
   *
   * @public
   */
  images() {
    return new Images({link: this.__link, dinky: this})
  }

  /**
   * Creates a List class that contains a bunch of shortcuts for Search.
   *
   * @return {Lists}
   *
   * @public
   */
  lists() {
    return new Lists({dinky: this})
  }
}

/**
 * @type {Dinky}
 */
module.exports = proxy({apply})(Dinky)
module.exports.NetworkError = NetworkError
module.exports.default = module.exports
module.exports.dinky = module.exports
module.exports.Dinky = module.exports
