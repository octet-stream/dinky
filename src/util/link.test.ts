/* eslint-disable no-undef, no-restricted-globals */
/* eslint no-redeclare: ["error", { "builtinGlobals": false }] */
/* eslint @typescript-eslint/no-redeclare: ["error", { "builtinGlobals": false }] */
import fetch, {Response} from "node-fetch"
import {spy, SinonSpy} from "sinon"
import nock from "nock" // TODO: Find a way to isolate nock betwen tests?

import anyTest, {TestFn} from "ava"

import Query from "./Query.js"
import isFunction from "./isFunction.js"
import NetworkError from "./NetworkError.js"

import {createLink, DEFAULT_URL} from "./link.js"

type Fetch = typeof globalThis.fetch

interface TestContext {
  fetch: SinonSpy<Parameters<Fetch>, ReturnType<Fetch>>
}

const test = anyTest as TestFn<TestContext>

const BASE_ENDPOINT = "/api/v1/json"
const BASE_URL = `${DEFAULT_URL}${BASE_ENDPOINT}`

let originalFetch: Fetch | undefined

// Disable all HTTP requests
test.before(() => {
  // Replace global fetch function with node-fetch if it exists on globalThis
  // That way we prevent outbound requests (nock can only disable connections for native http client)
  if (isFunction(globalThis.fetch)) {
    originalFetch = globalThis.fetch

    globalThis.fetch = fetch as unknown as Fetch
  }

  nock.disableNetConnect()
})

test.after.always(() => {
  nock.enableNetConnect()

  if (isFunction(originalFetch)) {
    globalThis.fetch = originalFetch
  }
})

test.beforeEach(t => {
  t.context.fetch = spy(fetch as unknown as Fetch)
})

test("Accepts custom fetch via fetchOptions", async t => {
  const {fetch} = t.context

  const scope = nock(BASE_URL).get("").reply(200, {})
  const link = createLink({linkOptions: {fetch}})

  await link([], new Query())

  t.true(fetch.called)

  scope.done()
})

test("Takes fetch from globalThis by default", async t => {
  const {fetch} = t.context
  const originalFetch = globalThis.fetch

  globalThis.fetch = fetch

  const scope = nock(BASE_URL).get("").reply(200, {})
  const link = createLink()

  await link([], new Query())

  t.true(fetch.called)

  scope.done()

  globalThis.fetch = originalFetch
})

test("Creates fetcher with default url", async t => {
  const {fetch} = t.context

  const scope = nock(BASE_URL).get("").reply(200, {})
  const link = createLink({linkOptions: {fetch}})

  await link([], new Query())

  const [actual] = fetch.firstCall.args

  t.is(actual, BASE_URL)

  scope.done()
})

test("Creates a link to given url", async t => {
  const {fetch} = t.context

  const expected = "https://furbooru.org"
  const scope = nock(`${expected}${BASE_ENDPOINT}`).get("").reply(200, {})

  const link = createLink({url: expected, linkOptions: {fetch}})

  await link([], new Query())

  const [actual] = fetch.firstCall.args

  t.is(new URL(String(actual)).origin, expected)

  scope.done()
})

test("Adds HTTPS protocol to custom URL", async t => {
  const {fetch} = t.context

  const hostname = "furbooru.org"
  const scope = nock(`https://${hostname}${BASE_ENDPOINT}`)
    .get("")
    .reply(200, {})

  const link = createLink({url: hostname, linkOptions: {fetch}})

  await link([], new Query())

  const [actual] = fetch.firstCall.args

  t.is(new URL(String(actual)).protocol, "https:")

  scope.done()
})

test("Replaces HTTP protocol with HTTPS in custom URL", async t => {
  const {fetch} = t.context

  const hostname = "furbooru.org"
  const scope = nock(`https://${hostname}${BASE_ENDPOINT}`)
    .get("")
    .reply(200, {})

  const link = createLink({url: `http://${hostname}`, linkOptions: {fetch}})

  await link([], new Query())

  const [actual] = fetch.firstCall.args

  t.is(new URL(String(actual)).protocol, "https:")

  scope.done()
})

test("Creates correct request address from given path and query", async t => {
  const {fetch} = t.context

  const path = ["search", "image"]
  const pathname = path.join("/")
  const search = "?q=princess+luna"
  const expected = `${BASE_ENDPOINT}/${pathname}`

  const scope = nock(BASE_URL).get(`/${pathname}${search}`).reply(200, {})
  const link = createLink({linkOptions: {fetch}})

  const query = new Query()

  query.set("q", "princess luna")

  await link(path, query)

  const actual = new URL(String(fetch.firstCall.args[0]))

  t.is(actual.pathname, expected)
  t.is(actual.search, search)

  scope.done()
})

test("Appends given key to query params", async t => {
  const {fetch} = t.context

  const expected = "secret"

  const scope = nock(BASE_URL).get("").query({key: expected}).reply(200, {})
  const link = createLink({linkOptions: {fetch, key: expected}})

  await link([], new Query())

  const url = new URL(String(fetch.firstCall.args[0]))
  const actual = new URLSearchParams(url.search).get("key")

  t.is(actual, expected)

  scope.done()
})

test("Appends given filter_id to query params", async t => {
  const {fetch} = t.context

  const expected = 420

  const scope = nock(BASE_URL)
    .get("")
    .query({filter_id: expected})
    .reply(200, {})

  const link = createLink({linkOptions: {fetch, filter: expected}})

  await link([], new Query())

  const url = new URL(String(fetch.firstCall.args[0]))
  const actual = new URLSearchParams(url.search).get("filter_id")

  t.is(actual, String(expected))

  scope.done()
})

test("Allows per-request key through 3rd argument of the link", async t => {
  const {fetch} = t.context

  const expected = "another-key"

  const scope = nock(BASE_URL).get("").query({key: expected}).reply(200, {})
  const link = createLink({linkOptions: {fetch, key: "secret"}})

  await link([], new Query(), {key: expected})

  const url = new URL(String(fetch.firstCall.args[0]))
  const actual = new URLSearchParams(url.search).get("key")

  t.is(actual, expected)

  scope.done()
})

test("Per-request key have higher priority", async t => {
  const {fetch} = t.context

  const expected = "secret"

  const scope = nock(BASE_URL).get("").query({key: expected}).reply(200, {})
  const link = createLink({linkOptions: {fetch}})

  await link([], new Query(), {key: expected})

  const url = new URL(String(fetch.firstCall.args[0]))
  const actual = new URLSearchParams(url.search).get("key")

  t.is(actual, expected)

  scope.done()
})

test("Accepts per-request filter in the 3rd argument of the link", async t => {
  const {fetch} = t.context

  const expected = 420

  const scope = nock(BASE_URL)
    .get("")
    .query({filter_id: expected})
    .reply(200, {})

  const link = createLink({linkOptions: {fetch}})

  await link([], new Query(), {filter: expected})

  const url = new URL(String(fetch.firstCall.args[0]))
  const actual = new URLSearchParams(url.search).get("filter_id")

  t.is(actual, String(expected))

  scope.done()
})

test("Per-request filter have higher priority", async t => {
  const {fetch} = t.context

  const expected = 451

  const scope = nock(BASE_URL)
    .get("")
    .query({filter_id: expected})
    .reply(200, {})

  const link = createLink({linkOptions: {fetch, filter: 419}})

  await link([], new Query(), {filter: expected})

  const url = new URL(String(fetch.firstCall.args[0]))
  const actual = new URLSearchParams(url.search).get("filter_id")

  t.is(actual, String(expected))

  scope.done()
})

test("Throws an error for non 2xx response", async t => {
  const {fetch} = t.context

  const scope = nock(BASE_URL).get("/not-found").reply(404)
  const link = createLink({linkOptions: {fetch}})

  const err = await t.throwsAsync<NetworkError>(
    link(["not-found"], new Query()),

    {
      instanceOf: NetworkError
    }
  )

  t.true(err.message.startsWith("Network error:"))
  t.true(err.response instanceof Response)
  t.is(err.status, 404)
  t.is(err.url, `${BASE_URL}/not-found`)

  scope.done()
})
