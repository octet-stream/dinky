const {parse, format} = require("url")

const fetch = require("node-fetch")
const camelCase = require("camelcase-keys")

const partial = require("./partialRight")
const waterfall = require("./waterfall")

const setProtocol = url => url.replace(/^(https?:\/\/)?/, "https://")

/**
 * @api private
 */
function link({url, key = null} = {}) {
  url = parse(setProtocol(url.toLowerCase()))

  return async function request(pathname, search) {
    if (key) {
      search.set(["key", key])
    }

    pathname = `${pathname}.json`

    const address = format({...url, pathname, search: search.toString()})

    const response = await fetch(address, {method: "get"})

    const read = () => response.json()

    return waterfall([read, partial(camelCase, {deep: true})])
  }
}

module.exports = link
