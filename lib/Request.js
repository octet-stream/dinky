const assign = Object.assign

/**
 * @private
 */
class Request {
  constructor(link, query = {}) {
    this.__link = link
    this.__query = query
  }

  async exec(endpoint, query) {
    return this.__link(endpoint, assign({}, this.__query, query))
  }

  then(onFulfilled, onRejected) {
    return this.exec().then(onFulfilled, onRejected)
  }

  catch(onRejected) {
    return this.exec().catch(onRejected)
  }
}

module.exports = Request
