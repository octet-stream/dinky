const link = require("./util/link")
const proxy = require("./util/proxy")
const apply = require("./util/selfInvokingClass")

const Images = require("./Images")

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
   * Creates request handler for /images.json
   *
   * @params {object} query
   *
   * @return {Images} – images query builder
   *
   * @public
   */
  images(query = {}) {
    return new Images({link: this.__link, dinky: this, query})
  }

  // async search(query = {}) {
  //   return new Search({link: this.link, dinky: this, params})
  // }
}

module.exports = proxy({apply})(Dinky)
