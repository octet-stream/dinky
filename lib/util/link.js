const fetch = require("node-fetch")

const replace = string => string.trim().replace(/\s+/, "+")

/**
 * @api private
 */
function link({url} = {}) {
  url = `https://${url}`

  return async function request(endpoint, query = null) {
    let address = `${url}/${endpoint}.json`

    if (query) {
      address += `?${replace(query)}`
    }

    const response = await fetch(address, {method: "get"})

    return response.json()
  }
}

module.exports = link
