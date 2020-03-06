const pq = require("proxyquire")
const test = require("ava")

const {spy} = require("sinon")

const Comments = require("../../lib/Comments")
const Search = require("../../lib/Search")
const Images = require("../../lib/Images")
const dinky = require("../../lib/Dinky")
const Lists = require("../../lib/Lists")
const Tags = require("../../lib/Tags")

const createNoopLink = require("../helper/createNoopLink")

test.beforeEach(createNoopLink)

test(".lists() returns the Lists instance", t => {
  t.true(dinky().lists() instanceof Lists)
})

test(".images() returns the Images instance", t => {
  t.true(dinky().images() instanceof Images)
})

test(".tags() returns the Tags instance", t => {
  t.true(dinky().tags() instanceof Tags)
})

test(".comments() returns the Comments instance", t => {
  t.true(dinky().comments() instanceof Comments)
})

test(".search() returns the Search instance", t => {
  t.true(dinky().search() instanceof Search)
})

test(".search() creates Search handler with given tags", t => {
  const FakeSearch = spy()

  // eslint-disable-next-line no-shadow
  const dinky = pq("../../lib/Dinky", {"./Search": FakeSearch})

  const expected = ["princess luna", "safe"]

  dinky().search(expected)

  t.deepEqual(FakeSearch.firstCall.lastArg.query, [expected])
})

test(
  "Tags#search() creates a Search request that points to /search/tags",
  async t => {
    const link = t.context.noopLink

    // eslint-disable-next-line no-shadow
    const dinky = pq("../../lib/Dinky", {
      "./util/link": () => link
    })

    await dinky().tags().search()

    const [actual] = link.firstCall.args

    t.deepEqual(actual, ["search", "tags"])
  }
)

test(
  "Images#search() creates a Search request that points to /search/images",
  async t => {
    const link = t.context.noopLink

    // eslint-disable-next-line no-shadow
    const dinky = pq("../../lib/Dinky", {
      "./util/link": () => link
    })

    await dinky().images().search()

    const [actual] = link.firstCall.args

    t.deepEqual(actual, ["search", "images"])
  }
)

test(
  "Comments#search() creates a Search request that points to /search/comments",
  async t => {
    const link = t.context.noopLink

    // eslint-disable-next-line no-shadow
    const dinky = pq("../../lib/Dinky", {
      "./util/link": () => link
    })

    await dinky().comments().search()

    const [actual] = link.firstCall.args

    t.deepEqual(actual, ["search", "comments"])
  }
)
