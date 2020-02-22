const {parse, format} = require("url")

const fetch = require("node-fetch")
const camelCase = require("camelcase-keys")

const partial = require("./partial")
const right = require("./partialRight")
const waterfall = require("./waterfall")
const NetworkError = require("./NetworkError")

// TODO: Make version configurable
const base = parse("https://derpibooru.org/api/v1/json")

const toCamelCase = right(camelCase, {deep: true})
const defaults = {
  key: undefined,
  filter: undefined
}

async function receiveData(response) {
  if (response.ok === false) {
    throw new NetworkError(`Network error: ${response.status}`, response)
  }

  return response.json()
}

/**
 * Creates a link for given Derpibooru's host. Optionally takes an API key.
 *
 * @param {object} options – link options
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

  /**
   * Sent a request with given params
   *
   * @param {string[]} pathname
   * @param {dinky.Query} search
   *
   * @return {Promise<object>}
   *
   * @api private
   */
  return async function link(path, search, params = {}) {
    path = [base.pathname, ...path].filter(Boolean)
    params = {...options, ...params}

    if (params.key) {
      search.set("key", params.key)
    }

    if (params.filter) {
      search.set("filter_id", params.filter)
    }


    const pathname = path.join("/").replace(/\/{2,}/g, "/")
    const url = format({...base, pathname, search: search.toString()})
    const sendRequest = partial(fetch, url, {method: "get"})

    return waterfall([sendRequest, receiveData, toCamelCase])
  }
}

module.exports = createLink
