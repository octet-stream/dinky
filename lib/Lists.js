class Lists {
  constructor({dinky}) {
    this._dinky = dinky
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
