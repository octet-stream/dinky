const {parse, format} = require("url")

const fetch = require("node-fetch")
const camelCase = require("camelcase-keys")

const partial = require("./partial")
const right = require("./partialRight")
const waterfall = require("./waterfall")
const setProtocol = require("./setProtocol")

const available = ["trixiebooru.org", "derpibooru.org"]
const joined = available.join(", ")

const defaults = {
  url: "derpibooru.org",
  key: undefined,
  filter: undefined
}

/**
 * Creates a link for given Derpibooru's host. Optionally takes an API key.
 *
 * @param {object} options – link options
 * @param {string} options.url - Derpibooru API hostname
 * @param {string} [options.key = undefined] – your personal API key
 *   taken from your account settings
 *
 * @return {Function}
 *
 * @api private
 */
function link(options) {
  options = {...defaults, ...options}

  const url = parse(setProtocol(options.url.toLowerCase()))

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

    if (options.key) {
      search.set("key", options.key)
    }

    if (options.filter) {
      search.set("filter_id", options.filter)
    }

    const pathname = `${path.join("/").replace(/\/{2,}/g, "/")}.json`
    const address = format({...url, pathname, search: search.toString()})
    const send = partial(fetch, address, {method: "get"})

    const read = response => response.json()

    return waterfall([send, read, right(camelCase, {deep: true})])
  }
}

module.exports = link
