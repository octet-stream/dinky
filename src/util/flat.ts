const {isArray} = Array

/**
 * @api private
 */
function flat<T extends unknown[]>(array: T, depth = 1) {
  const step = (prev: unknown[], next: unknown) => (
    prev.concat(isArray(next) && depth > 0 ? flat(next, depth - 1) : [next])
  )

  return array.reduce(step, [])
}

export default flat
