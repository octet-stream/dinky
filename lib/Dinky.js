const NetworkError = require("./util/NetworkError")
const apply = require("./util/selfInvokingClass")
const createLink = require("./util/link")
const proxy = require("./util/proxy")

const Lists = require("./Lists")
const Comments = require("./Comments")
const Images = require("./Images")
const Search = require("./Search")
const Tags = require("./Tags")

/**
 * @api public
 */
class Dinky {
  /**
   * JavaScript bindings for Derpibooru API
   *
   * @param {object} [options = {}] – client options
   * @param {string} [options.key = undefined] – your personal API key
   *   taken from your account settings
   * @param {number} [options.filter = undefined] – ID of a filter.
   *   The ID can be found on filters page: <https://derpibooru.org/filters>
   */
  constructor(options = {}) {
    /**
     * @prop {function} __link – fetch-compatible HTTP client
     *
     * @private
     */
    this.__link = createLink(options)
  }

  /**
   * Creates a request handler for /api/v1/json/search
   *
   * @param {string | string[]} [query = []] – a tag or a list of tags
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
    return new Lists({link: this.__link, dinky: this})
  }
}

module.exports = proxy({apply})(Dinky)
module.exports.NetworkError = NetworkError
module.exports.default = module.exports
module.exports.dinky = module.exports
module.exports.Dinky = module.exports
