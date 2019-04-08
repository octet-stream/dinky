const {parse, format} = require("url")

const fetch = require("node-fetch")
const camelCase = require("camelcase-keys")

const partial = require("./partial")
const right = require("./partialRight")
const waterfall = require("./waterfall")
const setProtocol = require("./setProtocol")

const available = ["trixiebooru.org", "derpibooru.org"]
const joined = available.join(", ")

const toCamelCase = right(camelCase, {deep: true})

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
 * @param {number} [options.filter = undefined] – ID of a filter.
 *   The ID can be found on filters page: <https://derpibooru.org/filters>
 *
 * @return {Function}
 *
 * @api private
 */
function createLink(options = {}) {
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
  return async function link(path, search, params = {}) {
    params = {...defaults, ...params}

    if (!available.includes(url.hostname)) {
      throw new Error(
        `Dinky can send requests only to these hosts: ${joined}`
      )
    }

    const key = params.key || options.key
    if (key) {
      search.set("key", key)
    }

    const filter = params.filter == null ? options.filter : params.filter
    if (filter) {
      search.set("filter_id", filter)
    }

    const pathname = `${path.join("/").replace(/\/{2,}/g, "/")}.json`
    const address = format({...url, pathname, search: search.toString()})
    const send = partial(fetch, address, {method: "get"})

    const read = response => response.json()

    return waterfall([send, read, toCamelCase])
  }
}

module.exports = createLink
