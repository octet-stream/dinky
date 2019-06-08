const Request = require("./Request")

class Lists extends Request {
  constructor({dinky, link}) {
    super({dinky, link, path: "lists"})
  }

  /*
   * Creates a request that gets 3 images lists (top scoring,
   * all time top scoring, top commented) for given period.
   *
   * @param {string} period – Sampling period, specified in weeks,
   *   days, or hours
   *
   * @return {Lists}
   */
  last(period) {
    this._query.set("last", period)

    return this
  }

  /**
   * Creates a Search request that gets top scoring images of last 3 days.
   * The most rated images will be at the top of the list.
   */
  topScoring() {
    return this._dinky
      .search("first_seen_at.gt:3 days ago")
      .sortBy("score")
      .descending()
  }

  /**
   * Creates a Search request that gets top scoring images of the all time.
   * The most rated images will be at the top of the list.
   *
   * @return {Search}
   */
  topScoringAllTime() {
    return this._dinky.search("*").descending().sortBy("score")
  }

  /**
   * Creates a Search request that gets top commented images of last 3 days.
   * The most commented images will be at the top of the list.
   *
   * @return {Search}
   */
  topCommented() {
    return this._dinky
      .search("first_seen_at.gt:3 days ago")
      .sortBy("comments")
      .descending()
  }
}

module.exports = Lists
