const link = require("./util/link")
const proxy = require("./util/proxy")
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
   * @param {string} [options.key = null] – your personal API key
   *   taken from your account settings
   */
  constructor({url = "derpibooru.org", key = null} = {}) {
    /**
     * @prop {function} __link – fetch-compatible HTTP client
     *
     * @private
     */
    this.__link = link({url, key})
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
   * @param {string | string[]} [tags = null] – a tag or a list of tags
   *
   * @return {Search}
   *
   * @public
   */
  search(tags = null) {
    return new Search({link: this.__link, dinky: this, tags})
  }
}

module.exports = proxy({apply})(Dinky)
