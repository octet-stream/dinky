const test = require("ava")

const Entities = require("../../lib/Entities")

const createNoopLink = require("../helper/createNoopLink")

test.beforeEach(createNoopLink)

test("Creates a link request that points to given path", async t => {
  const link = t.context.noopLink
  const expected = "images"

  await new Entities({link, path: expected})

  const [[actual]] = link.firstCall.args

  t.is(actual, expected)
})

test(".getById() creates a request to entity's ID", async t => {
  const link = t.context.noopLink
  const expected = 0

  await new Entities({link}).getById(0)

  const [[, actual]] = link.firstCall.args

  t.is(actual, expected)
})
