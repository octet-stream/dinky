const isPlainObject = require("./isPlainObject")

const {isArray} = Array
const {entries} = Object

/**
 * @param {Object<string, any>} object
 * @param {(value: any, key: string, object: Object<string, any>) => any} fn
 * @param {any} ctx
 *
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
