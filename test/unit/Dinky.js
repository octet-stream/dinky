const test = require("ava")
const pq = require("proxyquire")

const {spy} = require("sinon")

const dinky = require("../../lib/Dinky")
const Images = require("../../lib/Images")
const Search = require("../../lib/Search")

test("Dinky constructor creates a link function with default url", t => {
  const spylink = spy()

  // eslint-disable-next-line no-shadow
  const dinky = pq("../../lib/Dinky", {"./util/link": spylink})

  dinky()

  t.is(spylink.firstCall.lastArg.url, "derpibooru.org")
})

test("Dinky constructor creates a link with given url", t => {
  const spylink = spy()

  // eslint-disable-next-line no-shadow
  const dinky = pq("../../lib/Dinky", {"./util/link": spylink})

  dinky({url: "trixiebooru.org"})

  t.is(spylink.firstCall.lastArg.url, "trixiebooru.org")
})

test("Dinky#images returns the Images instance", t => {
  t.true(dinky().images() instanceof Images)
})

test("Dinky#search returns the Search instance", t => {
  t.true(dinky().search() instanceof Search)
})

test("Dinky#search creates Search handler with given tags", t => {
  const FakeSearch = spy()

  // eslint-disable-next-line no-shadow
  const dinky = pq("../../lib/Dinky", {"./Search": FakeSearch})

  const expected = ["princess luna", "safe"]

  dinky().search(expected)

  t.deepEqual(FakeSearch.firstCall.lastArg.tags, expected)
})

test(
  "Dinky should throw an error on requesting to unsupported url",
  async t => {
    const err = await t.throwsAsync(dinky({url: "example.com"}).images().exec())

    t.is(
      err.message,
      "Dinky can sends requests only to these hosts: " +
      "trixiebooru.org, derpibooru.org"
    )
  }
)
