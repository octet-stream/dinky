const pq = require("proxyquire")
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


test(
  ".topScoring() appends parameters to search for top scoring images",
  async t => {
    const link = t.context.noopLink

    const dinky = pq("../../lib/Dinky", {"./util/link": () => link})()

    await new Lists({link, dinky}).topScoring()

    const [, query] = link.firstCall.args

    t.is(query.get("q"), "first_seen_at.gt:3 days ago")
    t.is(query.get("sf"), "score")
    t.is(query.get("sd"), "desc")
  }
)

test(
  ".topScoringAllTime() appends parameters to search for top scoring images",
  async t => {
    const link = t.context.noopLink

    const dinky = pq("../../lib/Dinky", {"./util/link": () => link})()

    await new Lists({link, dinky}).topScoringAllTime()

    const [, query] = link.firstCall.args

    t.is(query.get("q"), "*")
    t.is(query.get("sf"), "score")
    t.is(query.get("sd"), "desc")
  }
)

test(
  ".topCommented() appends parameters to search for top commented images",
  async t => {
    const link = t.context.noopLink

    const dinky = pq("../../lib/Dinky", {"./util/link": () => link})()

    await new Lists({link, dinky}).topCommented()

    const [, query] = link.firstCall.args

    t.is(query.get("q"), "first_seen_at.gt:3 days ago")
    t.is(query.get("sf"), "comments")
    t.is(query.get("sd"), "desc")
  }
)
