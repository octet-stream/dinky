const fetch = require("node-fetch")

/**
 * @api private
 */
function link({url} = {}) {
  url = `https://${url}`

  return async function requestHandler(endpoint) {
    const address = `${url}/${endpoint}.json`

    const response = await fetch(address, {
      method: "get"
    })

    return response.json()
  }
}

module.exports = link
