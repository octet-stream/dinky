import map from "./objectFlatMap.js"

const fields = [
  "createdAt",
  "firstSeenAt",
  "updatedAt",
  "lastRepliedToAt",
  "avardedAt",
  "editedAt",
] as const

/**
 * Casts string dates to the Date object for fields in the above list
 *
 * @param object An object of the API response
 */
const castDates = (object: object) => map(
  object, (value: number | string, key) => {
    if (!fields.includes(key as any)) {
      return value
    }

    // In case of an invalid date we'll return its value as is
    return Number.isNaN(Date.parse(value as string)) ? value : new Date(value)
  }
)

export default castDates
