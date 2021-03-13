import {URLSearchParams, URL} from "url"

import test from "ava"
import pq from "proxyquire"
import fm from "fetch-mock"

import {Response} from "node-fetch"

import Query from "./Query"
import NetworkError from "./NetworkError"

import {createLink as actualCreateLink, DEFAULT_URL} from "./link"

const {createLink} = pq<{createLink: typeof actualCreateLink}>("./link", {
  "isomorphic-fetch": () => {
    throw new Error(
      "Please mock fetch in all tests from createLink options, like so: "
        + "createLink({linkOptions: <fetch function from fetch-mock>})"
    )
  }
})

const pattern = /^https:\/\/derpibooru.org/

test("Allows to bring your own fetch function", async t => {
  const fetch = fm.sandbox().mock(pattern, {})

  const link = createLink({linkOptions: {fetch}})

  await link(["images"], new Query())

  t.true(fetch.called())
})

test("Creates fetcher with default url", async t => {
  const fetch = fm.sandbox().mock(pattern, {})
  // const createLink = pq("../../../lib/util/link", {"isomorphic-fetch": fetch})

  const link = createLink({linkOptions: {fetch}})

  await link(["images"], new Query())

  t.true(fetch.called())
  t.true(fetch.lastUrl().startsWith(DEFAULT_URL))
})

test("Creates a link to the given url", async t => {
  const expected = "https://furbooru.org"
  const fetch = fm.sandbox().mock(new RegExp(`^${expected}`), {})

  const link = createLink({url: expected, linkOptions: {fetch}})

  await link(["images"], new Query())

  t.true(fetch.lastUrl().startsWith(expected))
})

test("Creates a correct request address from given path and query", async t => {
  const fetch = fm.sandbox().mock(pattern, {})

  // const createLink = pq("../../../lib/util/link", {"isomorphic-fetch": fetch})

  const link = createLink({linkOptions: {fetch}})
  const query = new Query()

  query.set("q", "princess luna")

  await link(["search", "images"], query)

  t.true(fetch.called())

  const actual = new URL(fetch.lastUrl())

  t.is(actual.pathname, "/api/v1/json/search/images")
  t.is(actual.search, "?q=princess+luna")
})

test("Appends given key to query params", async t => {
  const expected = "secret"

  const fetch = fm.sandbox().mock(pattern, {})
  // const createLink = pq("../../../lib/util/link", {"isomorphic-fetch": fetch})

  const link = createLink({linkOptions: {key: expected, fetch}})
  const query = new Query()

  await link(["search"], query)

  t.true(fetch.called())

  const url = new URL(fetch.lastUrl())
  const actual = new URLSearchParams(url.search)

  t.is(actual.get("key"), expected)
})

test("Appends given filter_id to query params", async t => {
  const expected = 419

  const fetch = fm.sandbox().mock(pattern, {})
  // const createLink = pq("../../../lib/util/link", {"isomorphic-fetch": fetch})

  const link = createLink({linkOptions: {filter: expected, fetch}})
  const query = new Query()

  await link(["search"], query)

  t.true(fetch.called())

  const url = new URL(fetch.lastUrl())
  const actual = new URLSearchParams(url.search)

  t.is(actual.get("filter_id"), String(expected))
})

test("Allows to set per-request key in the third argument", async t => {
  const expected = "secret"

  const fetch = fm.sandbox().mock(pattern, {})
  // const createLink = pq("../../../lib/util/link", {"isomorphic-fetch": fetch})

  const link = createLink({linkOptions: {fetch}})

  await link(["search"], new Query(), {key: expected})

  const url = new URL(fetch.lastUrl())
  const actual = new URLSearchParams(url.search)

  t.is(actual.get("key"), expected)
})

test("Per-request key have priority over the default one", async t => {
  const expected = "another-key"

  const fetch = fm.sandbox().mock(pattern, {})
  // const createLink = pq("../../../lib/util/link", {"isomorphic-fetch": fetch})

  const link = createLink({linkOptions: {key: "secret", fetch}})

  await link(["search"], new Query(), {key: expected})

  const url = new URL(fetch.lastUrl())
  const actual = new URLSearchParams(url.search)

  t.is(actual.get("key"), expected)
})

test("Allows to set per-request filter in the third argument", async t => {
  const expected = 419

  const fetch = fm.sandbox().mock(pattern, {})
  // const createLink = pq("../../../lib/util/link", {"isomorphic-fetch": fetch})

  const link = createLink({linkOptions: {fetch}})

  await link(["search"], new Query(), {filter: expected})

  const url = new URL(fetch.lastUrl())
  const actual = new URLSearchParams(url.search)

  t.is(actual.get("filter_id"), String(expected))
})

test("Per-request filter have priority over the default one", async t => {
  const expected = 451

  const fetch = fm.sandbox().mock(pattern, {})
  // const createLink = pq("../../../lib/util/link", {"isomorphic-fetch": fetch})

  const link = createLink({linkOptions: {filter: 419, fetch}})

  await link(["search"], new Query(), {filter: expected})

  const url = new URL(fetch.lastUrl())
  const actual = new URLSearchParams(url.search)

  t.is(actual.get("filter_id"), String(expected))
})

test("Throws an error for non 2xx response", async t => {
  const fetch = fm.sandbox().mock(pattern, 404)
  // const createLink = pq("../../../lib/util/link", {"isomorphic-fetch": fetch})

  const link = createLink({linkOptions: {fetch}})

  const err: NetworkError = await t.throwsAsync(link(["search"], new Query()))

  t.true(err instanceof NetworkError)
  t.is(err.message, "Network error: Not Found")

  t.true(err.response instanceof Response)
  t.is(err.status, 404)
  t.is(err.statusText, "Not Found")
  t.is(err.url, "https://derpibooru.org/api/v1/json/search")
})
