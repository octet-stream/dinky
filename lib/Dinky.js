const NetworkError = require("./util/NetworkError")
const apply = require("./util/selfInvokingClass")
const createLink = require("./util/link")
const proxy = require("./util/proxy")

// const Lists = require("./Lists")
const Images = require("./Images")
const Search = require("./Search")

/**
 * @api public
 */
class Dinky {
  /**
   * A JavaScript client for Derpibooru API
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
   * Creates a request handler for /api/v1/json/search/images
   *
   * @param {string | string[]} [tags = []] – a tag or a list of tags
   *
   * @return {Search}
   *
   * @public
   */
  search(...tags) {
    return new Search({link: this.__link, dinky: this, tags})
  }

  /**
   * Creates a new Lists instance to give you ability
   * to send requests to `/lists.json` and bunch of shortcuts
   * to search for specific images categories on `/search.json`
   *
   * @return {Lists}
   */
  // TODO: the new API does not have an endpoint for lists
  //       or at least it's not oublicly listed/documented

  // lists() {
  //   return new Lists({link: this.__link, dinky: this})
  // }
}

module.exports = proxy({apply})(Dinky)
module.exports.NetworkError = NetworkError
module.exports.default = module.exports
module.exports.dinky = module.exports
module.exports.Dinky = module.exports
