const pq = require("proxyquire")
const test = require("ava")

const Lists = require("../../lib/Lists")

const createNoopLink = require("../helper/createNoopLink")

test.beforeEach(createNoopLink)

test(
  ".topScoring() appends parameters to search for top scoring images",
  async t => {
    const link = t.context.noopLink

    const dinky = pq("../../lib/Dinky", {"./util/link": () => link})()

    await new Lists({dinky}).topScoring()

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

    await new Lists({dinky}).topScoringAllTime()

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

    await new Lists({dinky}).topCommented()

    const [, query] = link.firstCall.args

    t.is(query.get("q"), "first_seen_at.gt:3 days ago")
    t.is(query.get("sf"), "comments")
    t.is(query.get("sd"), "desc")
  }
)
