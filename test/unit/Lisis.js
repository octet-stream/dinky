const test = require("ava")

const Lists = require("../../lib/Lists")

const createNoopLink = require("../helper/createNoopLink")

test.beforeEach(createNoopLink)

test("Creates request handler to the /lists.json path", async t => {
  const link = t.context.noopLink

  await new Lists({link}).last("4w")

  const [[actual]] = link.firstCall.args

  t.is(actual, "lists")
})

test(".last() sets the \"last\" parameter with given period", async t => {
  const link = t.context.noopLink

  await new Lists({link}).last("4w")

  const [, query] = link.firstCall.args

  t.is(query.get("last"), "4w")
})
