/**
 * @api private
 */
const partial = (fn, ...parts) => (...args) => fn(...parts, ...args)

module.exports = partial
