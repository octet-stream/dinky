const isPlainObject = require("./isPlainObject")

const {isArray} = Array
const {entries} = Object

/**
 * @api private
 */
function objectFlatMap(object, fn, ctx = null) {
  const res = isArray(object) ? [] : {}

  for (const [key, value] of entries(object)) {
    if (isArray(value) || isPlainObject(value)) {
      res[key] = objectFlatMap(value, fn, ctx)
    } else {
      res[key] = fn.call(ctx, value, key, object)
    }
  }

  return res
}

module.exports = objectFlatMap
