import isPlainObject from "./isPlainObject"

const {isArray} = Array
const {entries} = Object

interface Callback {
  (value: any, key: string, object: unknown): any
}

function objectFlatMap(object: object, fn: Callback, ctx?: unknown): unknown {
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
