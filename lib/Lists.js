const Request = require("./Request")

class Lists extends Request {
  constructor({dinky, link}) {
    super({dinky, link, path: "lists"})
  }

  last(period) {
    this._query.set("last", period)

    return this
  }

  topScoring() {
    return this._dinky
      .search("first_seen_at.gt:3 days ago")
      .sortBy("score")
      .descending()
  }

  topScoringAllTime() {
    return this._dinky.search("*").descending().sortBy("score")
  }

  topCommented() {
    return this._dinky
      .search("first_seen_at.gt:3 days ago")
      .sortBy("comments")
      .descending()
  }
}

module.exports = Lists
