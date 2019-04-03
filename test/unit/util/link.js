const {URLSearchParams, parse, format} = require("url")

const test = require("ava")
const pq = require("proxyquire")
const fm = require("fetch-mock")

const Query = require("../../../lib/Query")

const pattern = /^https:\/\/(derpibooru|trixiebooru).org/

test("Creates fetcher with default url", async t => {
  const fetch = fm.sandbox().mock(pattern, {})
  const link = pq("../../../lib/util/link", {"node-fetch": fetch})()

  await link(["images"], new Query())

  t.true(fetch.called())

  const {hostname, protocol} = parse(fetch.lastUrl())

  t.is(format({hostname, protocol}), "https://derpibooru.org")
})

test("Creates fetcher with reserve url", async t => {
  const expected = "https://trixiebooru.org"
  const fetch = fm.sandbox().mock(pattern, {})
  const link = pq("../../../lib/util/link", {"node-fetch": fetch})({
    url: expected
  })

  await link(["images"], new Query())

  t.true(fetch.called())

  const {hostname, protocol} = parse(fetch.lastUrl())

  t.is(format({hostname, protocol}), expected)
})

test("Creates a correct request address from given path and query", async t => {
  const fetch = fm.sandbox().mock(pattern, {})
  const link = pq("../../../lib/util/link", {"node-fetch": fetch})()
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

  const fetch = fm.sandbox().mock(pattern, {})

  const link = pq("../../../lib/util/link", {"node-fetch": fetch})({
    key: expected
  })

  const query = new Query()

  await link(["search"], query)

  t.true(fetch.called())

  const actual = parse(fetch.lastUrl())
  const search = new URLSearchParams(actual.search)

  t.true(search.has("key"))
  t.is(search.get("key"), expected)
})

test("Appends given filter_id to query params", async t => {
  const expected = 419

  const fetch = fm.sandbox().mock(pattern, {})

  const link = pq("../../../lib/util/link", {"node-fetch": fetch})({
    filter: expected
  })

  const query = new Query()

  await link(["search"], query)

  t.true(fetch.called())

  const actual = parse(fetch.lastUrl())
  const search = new URLSearchParams(actual.search)

  t.true(search.has("filter_id"))
  t.is(search.get("filter_id"), String(expected))
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
