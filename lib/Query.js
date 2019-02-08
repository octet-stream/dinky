const {URLSearchParams} = require("url")

const isString = require("./util/isString")

/**
 * @api private
 */
function assertKey(key) {
  if (!isString(key)) {
    throw new TypeError("Given key must be a string.")
  }
}

/**
 * @api private
 */
class Query extends Map {
  set(key, value) {
    assertKey(key)

    return super.set(key, value)
  }

  get(key) {
    assertKey(key)

    return super.get(key)
  }

  has(key) {
    assertKey(key)

    return super.has(key)
  }

  delete(key) {
    assertKey(key)

    return super.delete(key)
  }

  toString() {
    const entries = []

    for (const [key, value] of this) {
      // Omit all nullish keys because they're not necessary
      if (value || value === 0) {
        entries.push([key, value])
      }
    }

    // Use URLSearchParams with Query class here because looks like
    // it casts all given data types to string, but we need to save them
    // as we need more flexibility for query search parameters
    // For example: having an access to arrays as-is allows us to pass
    // more data into it. See Search#tags() method as an example
    return new URLSearchParams(entries).toString()
  }

  get [Symbol.toStringTag]() {
    return this.toString()
  }
}

module.exports = Query
