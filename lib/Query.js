const isString = require("./util/isString")

function assertKey(key) {
  if (!isString(key)) {
    throw new TypeError("Given key must be a string.")
  }
}

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

    for (const entry of this) {
      res.push(entry.join("="))
    }

    return res.join("&")
  }

  get [Symbol.toStringTag]() {
    return this.toString()
  }
}

module.exports = Query
