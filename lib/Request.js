/**
 * @private
 */
class Request {
  constructor(link, query = {}) {
    this.__link = link
    this.__query = query
  }

  async exec(endpoint, query) {
    return this.__link(endpoint, query)
  }

  then(onFulfilled, onRejected) {
    return this.exec().then(onFulfilled, onRejected)
  }

  catch(onRejected) {
    return this.exec().catch(onRejected)
  }
}

module.exports = Request
