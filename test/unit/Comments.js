const test = require("ava")

const Comments = require("../../lib/Comments")

const createNoopLink = require("../helper/createNoopLink")

test.beforeEach(createNoopLink)

test("Creates a link with path to /api/v1/json/comments", async t => {
  const link = t.context.noopLink

  await new Comments({link})

  const [path] = link.firstCall.args

  t.deepEqual(path, ["comments"])
})
