const test = require("ava")

const Tags = require("../../lib/Tags")

const createNoopLink = require("../helper/createNoopLink")

test.beforeEach(createNoopLink)

test("Creates a link with path to /api/v1/json/tags", async t => {
  const link = t.context.noopLink

  await new Tags({link})

  const [path] = link.firstCall.args

  t.deepEqual(path, ["tags"])
})

test("Creates a link with path for specified tag ID", async t => {
  const link = t.context.noopLink

  await new Tags({link}).id(0)

  const [path] = link.firstCall.args

  t.is(path.length, 2)
  t.is(path[1], 0)
})
