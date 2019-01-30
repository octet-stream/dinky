/**
 * @api private
 */
const partialRight = (fn, ...parts) => (...args) => fn(
  ...parts.concat(args).reverse()
)

module.exports = partialRight
