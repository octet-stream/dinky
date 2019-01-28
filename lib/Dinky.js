const link = require("./util/link")
const proxy = require("./util/proxy")
const apply = require("./util/selfInvokingClass")
const isPlainObject = require("./util/isPlainObject")

const Images = require("./Images")
const Search = require("./Search")

class Dinky {
  /**
   * Derpibooru client for JavaScript
   *
   * @param {object} [options = {}] – client options
   * @param {string} options.url - one of Derpibooru hostname
   *
   * @api public
   */
  constructor({url, key} = {}) {
    /**
     * @prop {function} link – fetch-compatible HTTP client
     *
     * @private
     */
    this.__link = link({url, key})
  }

  /**
   * Creates a request handler for /images.json
   *
   * @params {object} query
   *
   * @return {Images} – images query builder
   *
   * @public
   */
  images(id, query = {}) {
    if (isPlainObject(id)) {
      [query, id] = [id, null]
    }

    return new Images({link: this.__link, dinky: this, query, id})
  }

  async search(tags) {
    return new Search({link: this.link, dinky: this, tags})
  }
}

module.exports = proxy({apply})(Dinky)
