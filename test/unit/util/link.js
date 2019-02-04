const {URLSearchParams, parse} = require("url")

const test = require("ava")
const pq = require("proxyquire")
const fm = require("fetch-mock")

const Query = require("../../../lib/Query")

const url = "https://derpibooru.org"

test("Creates a correct request address from given path and query", async t => {
  const fetch = fm.sandbox().mock(`${url}/search.json?q=princess+luna`, {})
  const link = pq("../../../lib/util/link", {"node-fetch": fetch})({url})
  const query = new Query()

  query.set("q", "princess luna")

  await link(["search"], query)

  t.true(fetch.called())

  const actual = parse(fetch.lastUrl())

  t.is(actual.pathname, "/search.json")
  t.is(actual.query, "q=princess+luna")
})

test("Appends given key to query params", async t => {
  const expected = "secret"

  const fetch = fm.sandbox()
    .mock(`${url}/search.json?q=princess+luna&key=${expected}`, {})

  const link = pq("../../../lib/util/link", {"node-fetch": fetch})({
    url, key: expected
  })

  const query = new Query()

  query.set("q", "princess luna")

  await link(["search"], query)

  t.true(fetch.called())

  const actual = parse(fetch.lastUrl())
  const search = new URLSearchParams(actual.search)

  t.true(search.has("key"))
  t.is(search.get("key"), expected)
})

test("Thows an error when unknown url was set", async t => {
  const link = pq("../../../lib/util/link", {"node-fetch": () => { }})({
    url: "https://unknownhost.org"
  })

  const err = await t.throwsAsync(link([], new Query()))

  t.is(
    err.message,
    "Dinky can send requests only to these hosts: " +
    "trixiebooru.org, derpibooru.org"
  )
})
