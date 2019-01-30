const isString = require("./util/isString")

/**
 * @api private
 */
const trim = query => String(query).trim().replace(/\s+/g, "+")

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
    const res = []

    for (const [key, value] of this) {
      if (value != null) {
        res.push(`${key}=${value}`)
      }
    }

    return trim(res.join("&"))
  }

  get [Symbol.toStringTag]() {
    return this.toString()
  }
}

module.exports = Query
