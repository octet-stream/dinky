const {join} = require("path")

const fetch = require("node-fetch")

class Link {
  constructor({url} = {}) {
    this.url = `https://${url}`
  }

  // TODO: Normalize endpoint before send a request
  // TODO: Add query params supprot
  async exec(endpoint) {
    const address = join(this.url, `${endpoint}.json`)

    const response = await fetch(address, {
      method: "get"
    })

    return response.json()
  }

  then(onFulfilled, onRejected) {
    return this.exec().then(onFulfilled, onRejected)
  }

  catch(onRejected) {
    return this.exec().catch(onRejected)
  }
}

module.exports = Link
