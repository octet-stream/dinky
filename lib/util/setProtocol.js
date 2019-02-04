/**
 * Adds or replaces HTTPS protocol on given url
 *
 * @parma {string} url
 *
 * @return {string}
 *
 * @api private
 */
const setProtocol = url => url.replace(/^(https?:\/\/)?/, "https://")

module.exports = setProtocol
