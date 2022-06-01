import test from "ava"

import {createNoopLink} from "../__helper__/createNoopLink.js"

import {Search} from "./Search.js"
import type {BaseSearchOptions} from "./Search.js"

class NoopSearch extends Search<"images"> {
  constructor(options: BaseSearchOptions = {}) {
    super({...options, type: "images"})
  }
}

test("Creates a link to /api/v1/json/search", async t => {
  const link = createNoopLink()

  await new NoopSearch({link})

  const [[actual]] = link.firstCall.args

  t.is(actual, "search")
})

test("Creates search request without tags by default", async t => {
  const link = createNoopLink()

  await new NoopSearch({link})

  const [, query] = link.firstCall.args

  t.false(query.has("q"))
})

test(
  ".query() will not set any tags when called without arguments",
  async t => {
    const link = createNoopLink()

    await new NoopSearch({link}).query()

    const [, query] = link.firstCall.args

    t.false(query.has("q"))
  }
)

test(".query() allows to pass a one tag from the string", async t => {
  const link = createNoopLink()

  await new NoopSearch({link}).query("scootaloo")

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "scootaloo")
})

test(".query() allows to set tags from multiple strings", async t => {
  const link = createNoopLink()

  await new NoopSearch({link}).query("artist:rainbow", "scootaloo")

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "artist:rainbow,scootaloo")
})

test(".query() allows to set tags from array", async t => {
  const link = createNoopLink()

  await new NoopSearch({link}).query(["artist:rainbow", "scootaloo"])

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "artist:rainbow,scootaloo")
})

test(".query() allows to set tags from multiple arrays", async t => {
  const link = createNoopLink()

  await new NoopSearch({link}).query(["artist:rainbow"], ["scootaloo"])

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "artist:rainbow,scootaloo")
})
