const test = require("ava")

const Images = require("../../lib/Images")

const createNoopLink = require("../helper/createNoopLink")

test.beforeEach(createNoopLink)

test("Creates a link with path to /images.json", async t => {
  const link = t.context.noopLink

  await new Images({link})

  const [path] = link.firstCall.args

  t.deepEqual(path, ["images"])
})

test("Creates a link with path for specified image ID", async t => {
  const link = t.context.noopLink

  await new Images({link}).id(0)

  const [path] = link.firstCall.args

  t.is(path.length, 2)
  t.deepEqual(path[1], 0)
})
