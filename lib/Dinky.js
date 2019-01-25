const link = require("./util/link")
const proxy = require("./util/proxy")
const apply = require("./util/selfInvokingClass")

class Dinky {
  /**
   * Derpibooru client for JavaScript
   *
   * @param {object} [options = {}] – client options
   * @param {string} options.url - one of Derpibooru hostname
   */
  constructor(options = {}) {
    this.link = link({url: options.url})
  }

  async images(params = {}) {
    return this.link("/images", params)
  }

  async search(params = {}) {
    return this.link("/search", params)
  }
}

module.exports = proxy({apply})(Dinky)
