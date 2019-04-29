const Request = require("./Request")

class Lists extends Request {
  constructor({dinky, link}) {
    super({dinky, link, path: "lists"})
  }

  last(period) {
    this._query.set("last", period)

    return this
  }
}

module.exports = Lists
