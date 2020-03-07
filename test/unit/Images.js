const test = require("ava")

const Images = require("../../lib/Images")

const createNoopLink = require("../helper/createNoopLink")

test.beforeEach(createNoopLink)

test("Creates a link with path to /api/v1/json/images", async t => {
  const link = t.context.noopLink

  await new Images({link})

  const [path] = link.firstCall.args

  t.deepEqual(path, ["images"])
})

test("Creates a link that points to /api/v1/json/images/featured", async t => {
  const link = t.context.noopLink

  await new Images({link}).featured()

  const [[, actual]] = link.firstCall.args

  t.is(actual, "featured")
})
