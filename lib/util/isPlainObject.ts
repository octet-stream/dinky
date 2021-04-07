const getType = (value: unknown): string => (
  Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
)

function isPlainObject(value: unknown): value is object {
  if (getType(value) !== "object") {
    return false
  }

  const pp = Object.getPrototypeOf(value)

  if (pp === null || pp === undefined) {
    return true
  }

  const Ctor = pp.constructor && pp.constructor.toString()

  return Ctor === Object.toString()
}

export default isPlainObject
