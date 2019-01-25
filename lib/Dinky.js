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
  constructor(options = {}) {
    /**
     * @prop {function} link – fetch-compatible HTTP client
     *
     * @private
     */
    this.__link = link({url: options.url})
  }

  /**
   * @return {Images} – images query builder
   *
   * @public
   */
  images(params = {}) {
    return new Images({link: this.__link, dinky: this, params})
  }

  // async search(params = {}) {
  //   return new Search({link: this.link, dinky: this, params})
  // }
}

module.exports = proxy({apply})(Dinky)
