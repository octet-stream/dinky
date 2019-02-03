const {spy} = require("sinon")

const createNoopLink = t => t.context.noopLink = spy(() => Promise.resolve({}))

module.exports = createNoopLink
