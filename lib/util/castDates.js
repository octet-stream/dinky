const map = require("./objectFlatMap")

const fields = [
  "createdAt",
  "firstSeenAt",
  "updatedAt",
  "lastRepliedToAt",
  "avardedAt"
]

/**
 * Casts string dates to the Date object for fields in the above list
 *
 * @param {Object<string, any>} object An object of the API response
 *
 * @return {Object<string, any>}
 *
 * @api private
 */
const castDates = object => map(object, (value, key) => {
  if (!fields.includes(key)) {
    return value
  }

  // In case of an imvalid date we'll return its value as is
  return Number.isNaN(Date.parse(value)) ? value : new Date(value)
})

module.exports = castDates
