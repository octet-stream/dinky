const {isArray} = Array

/**
 * Flattents given array
 *
 * @api private
 */
function flat<T extends unknown[]>(array: T, depth = 1): T {
  const step = (prev: unknown[], next: unknown) => (
    prev.concat(isArray(next) && depth > 0 ? flat(next, depth - 1) : [next])
  )

  return array.reduce(step, []) as T
}

export default flat
