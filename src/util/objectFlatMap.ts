import isPlainObject from "./isPlainObject.js"

const {isArray} = Array
const {entries} = Object

interface Callback {
  (value: unknown, key: string, object: unknown): unknown
}

function objectFlatMap(object: unknown, fn: Callback, ctx?: unknown): unknown {
  const result = isArray(object) ? [] : {}

  for (const [key, value] of entries(object)) {
    if (isArray(value) || isPlainObject(value)) {
      result[key] = objectFlatMap(value, fn, ctx)
    } else {
      result[key] = fn.call(ctx, value, key, object)
    }
  }

  return result
}

export default objectFlatMap
