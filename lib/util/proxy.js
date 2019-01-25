/**
 * Applys a Proxy and handlers to given Target
 *
 * @param {object} handlers
 * @param {Function} Target
 *
 * @api private
 */
const proxy = handlers => Target => new Proxy(Target, handlers)

module.exports = proxy
