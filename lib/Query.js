const {URLSearchParams} = require("url")

const isString = require("./util/isString")

/**
 * @param {string} key
 *
 * @return {void}
 *
 * @api private
 */
function assertKey(key) {
  if (!isString(key)) {
    throw new TypeError("Given key must be a string.")
  }
}

/**
 * Query params storage.
 * Unlike URLSearchParams this class keeps every entry as is,
 * so you would be able to read them from the store.
 *
 * @api private
 */
class Query extends Map {
  /**
   * Adds a new antry to the store
   *
   * @param {string} key
   * @param {any} value
   *
   * @return {Query}
   *
   * @public
   */
  set(key, value) {
    assertKey(key)

    return super.set(key, value)
  }

  /**
   * Returns an antry by its name if so exists.
   *
   * @param {string} name
   *
   * @return {any}
   *
   * @public
   */
  get(key) {
    assertKey(key)

    return super.get(key)
  }

  /**
   * Checks if an entry associated key exists
   *
   * @param {string} key
   *
   * @return {boolean}
   *
   * @public
   */
  has(key) {
    assertKey(key)

    return super.has(key)
  }

  /**
   * Removes an entry associated with given key
   *
   * @param {string} key
   *
   * @return {void}
   *
   * @public
   */
  delete(key) {
    assertKey(key)

    return super.delete(key)
  }

  /**
   * Casts query params to a string
   *
   * @return {string}
   *
   * @public
   */
  toString() {
    const entries = []

    for (const [key, value] of this) {
      // Omit all nullish and falsy keys as of they aren't necessary
      if (value || value === 0) {
        entries.push([key, value])
      }
    }

    // Use URLSearchParams to stringify entries
    return new URLSearchParams(entries).toString()
  }

  get [Symbol.toStringTag]() {
    return this.toString()
  }
}

module.exports = Query
