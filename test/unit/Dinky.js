const test = require("ava")
const pq = require("proxyquire")

const {spy} = require("sinon")

const Comments = require("../../lib/Comments")
const Search = require("../../lib/Search")
const Images = require("../../lib/Images")
const dinky = require("../../lib/Dinky")
const Lists = require("../../lib/Lists")
const Tags = require("../../lib/Tags")

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
