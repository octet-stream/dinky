const {parse, format} = require("url")

const fetch = require("node-fetch")
const camelCase = require("camelcase-keys")

const partial = require("./partial")
const right = require("./partialRight")
const waterfall = require("./waterfall")
const setProtocol = require("./setProtocol")

const available = ["trixiebooru.org", "derpibooru.org"]
const joined = available.join(", ")

/**
 * Creates a link for given Derpibooru's host. Optionally takes an API key.
 *
 * @param {object} options – link options
 * @param {string} options.url - Derpibooru API hostname
 * @param {string} [options.key = null] – your personal API key
 *   taken from your account settings
 *
 * @api private
 */
function link({url, key = null}) {
  url = parse(setProtocol(url.toLowerCase()))

  /**
   * Sent a request with given params
   *
   * @param {string[]} pathname
   * @param {dinky.Query} search
   *
   * @return {object | object[]}
   *
   * @api private
   */
  return async function request(path, search) {
    if (!available.includes(url.hostname)) {
      throw new Error(
        `Dinky can send requests only to these hosts: ${joined}`
      )
    }

    if (key) {
      search.set("key", key)
    }

    const pathname = `${path.join("/").replace(/\/{2,}/g, "/")}.json`
    const address = format({...url, pathname, search: search.toString()})
    const send = partial(fetch, address, {method: "get"})

    const read = response => response.json()

    return waterfall([send, read, right(camelCase, {deep: true})])
  }
}

module.exports = link
