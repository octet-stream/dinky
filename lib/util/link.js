const {parse, format} = require("url")

const fetch = require("node-fetch")

const isPlainObject = require("./isPlainObject")

const isArray = Array.isArray
const entries = Object.entries

const setProtocol = url => url.replace(/^(https?:\/\/)?/, "https://")

const trim = query => String(query).trim().replace(/\s+/g, "+")

/**
 *
 */
function produce(query) {
  switch (true) {
    case typeof query === "string":
      return new URLSearchParams(query)

    case isArray(query):
      return query.entries()

    // Add deep object support
    case isPlainObject(query):
      return entries(query)

    default:
      return []
  }
}

/**
 * @api private
 */
function link({url, key = null} = {}) {
  url = parse(setProtocol(url.toLowerCase()))

  return async function request(pathname, query = null) {
    let search = []

    if (key) {
      search.set(["key", key])
    }

    for (const [name, value] of produce(query)) {
      search.push([name, value])
    }

    pathname = `${pathname}.json`
    search = trim(search.map(param => param.join("=")).join("&"))

    url = format({...url, pathname, search})

    const response = await fetch(url, {method: "get"})

    // TODO: Add response proxy or convert case notation
    // underscore_case -> camelCase
    return response.json()
  }
}

module.exports = link
