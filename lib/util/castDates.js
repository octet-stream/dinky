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
 * @param {object} object – an object of the API response
 *
 * @return {object}
 *
 * @api private
 */
const castDates = object => map(object, (value, key) => {
  if (!fields.includes(key)) {
    return value
  }

  // In case the date is not the valid we'll return value as is
  return Number.isNaN(Date.parse(value)) ? value : new Date(value)
})

module.exports = castDates
