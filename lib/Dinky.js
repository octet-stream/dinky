const proxy = require("./util/proxy")
const createLink = require("./util/link")
const apply = require("./util/selfInvokingClass")

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
   * @param {string} [options.url = "derpibooru.org"] - Derpibooru API hostname
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
   * Creates a request handler for /images.json
   *
   * @return {Images}
   *
   * @public
   */
  images() {
    return new Images({link: this.__link, dinky: this})
  }

  /**
   * Creates a request handler for /search.json
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
}

module.exports = proxy({apply})(Dinky)
module.exports.default = module.exports
