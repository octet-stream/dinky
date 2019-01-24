const Link = require("./util/Link")

class Dinky {
  /**
   * @param {object} [options = {}] – client options
   * @param {string} options.url - one of Derpibooru hostname
   */
  constructor(options = {}) {
    this.link = new Link({url: options.url})
  }

  async images(params = {}) {
    return this.link("/images", params)
  }

  async search(params = {}) {
    return this.link("/search", params)
  }
}

module.exports = Dinky
