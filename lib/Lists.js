/**
 * @typedef {import("./Dinky")} Dinky
 * @typedef {import("./Search")} Search
 */

/**
 * @api private
 */
class Lists {
  /**
   * @param {Object} params
   * @param {Dinky} params.dinky
   */
  constructor({dinky}) {
    this._dinky = dinky
  }

  /**
   * Creates a Search request that gets top scoring images of last 3 days.
   * The most rated images will be at the top of the list.
   *
   * @return {Search}
   *
   * @public
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
   *
   * @public
   */
  topScoringAllTime() {
    return this._dinky.search("*").descending().sortBy("score")
  }

  /**
   * Creates a Search request that gets top commented images of last 3 days.
   * The most commented images will be at the top of the list.
   *
   * @return {Search}
   *
   * @public
   */
  topCommented() {
    return this._dinky
      .search("first_seen_at.gt:3 days ago")
      .sortBy("comments")
      .descending()
  }
}

module.exports = Lists
