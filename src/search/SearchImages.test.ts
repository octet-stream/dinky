import test from "ava"

import {createNoopLink} from "../__helper__/createNoopLink.js"
import {SearchImages} from "./SearchImages.js"
import type {SearchType} from "./Search.js"

test("Has correct search type", async t => {
  const link = createNoopLink()

  await new SearchImages({link})

  const [[, actual]] = link.firstCall.args

  t.is<string, SearchType>(actual, "images")
})

test(".faves() sets my:faves to request", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).faves()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "my:faves")
})

test(".faves() appends my:faves to the existent tags set", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).query(["scootaloo", "safe"]).faves()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "scootaloo,safe,my:faves")
})

test(".watched() sets my:watched to request", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).watched()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "my:watched")
})

test(".watched() appends my:watched to the existent tags set", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).query(["scootaloo", "safe"]).watched()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "scootaloo,safe,my:watched")
})

test(".upvotes() sets my:upvotes to request", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).upvotes()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "my:upvotes")
})

test(".upvotes() appends my:upvotes to the existent tags set", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).query(["scootaloo", "safe"]).upvotes()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "scootaloo,safe,my:upvotes")
})

test(".downvotes() sets my:downvotes to request", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).downvotes()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "my:downvotes")
})

test(".downvotes() appends my:downvotes to the existent tags set", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).query(["scootaloo", "safe"]).downvotes()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "scootaloo,safe,my:downvotes")
})

test(".uploads() sets my:uploads to request", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).uploads()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "my:uploads")
})

test(".uploads() appends my:uploads to the existent tags set", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).query(["scootaloo", "safe"]).uploads()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "scootaloo,safe,my:uploads")
})

test(".favedBy() sets faved_by parameter with the given user", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).favedBy("minuette")

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "faved_by:minuette")
})

test(".uploadedBy() sets uploader parameter with the given user", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).uploadedBy("minuette")

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "uploader:minuette")
})

test(".limit() adds the page limit (per_page param) to query", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).limit(42)

  const [, query] = link.firstCall.args

  t.is(query.get("per_page"), 42)
})

test(".minScore() adds the minimal images score to query", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).minScore(420)

  const [, query] = link.firstCall.args

  t.is(query.get("min_score"), 420)
})

test(".maxScore() adds the maximal images score to query", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).maxScore(2600)

  const [, query] = link.firstCall.args

  t.is(query.get("max_score"), 2600)
})

test(".ascending() sets ordering to the ascending", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).ascending()

  const [, query] = link.firstCall.args

  t.is(query.get("sd"), "asc")
})

test(".descending() sets ordering to the descending", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).descending()

  const [, query] = link.firstCall.args

  t.is(query.get("sd"), "desc")
})

test(".sortBy() sets sorting param with given field", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).sortBy("score")

  const [, query] = link.firstCall.args

  t.is(query.get("sf"), "score")
})

test(".random() adds sf=random param to query", async t => {
  const link = createNoopLink()

  await new SearchImages({link}).random()

  const [, query] = link.firstCall.args

  t.is(query.get("sf"), "random")
})

test(
  ".random() will apply the * wildcard when no tags has been set",

  async t => {
    const link = createNoopLink()

    await new SearchImages({link}).random()

    const [, actual] = link.firstCall.args

    t.is(actual.get("q"), "*")
  }
)

test(
  ".reverse() adds proper params for the image reverse-searching",

  async t => {
    const expected = "https://derpicdn.net/img/2019/12/24/2228439/full.jpg"
    const link = createNoopLink()

    await new SearchImages({link}).reverse(expected)

    const [[, searchType], query] = link.firstCall.args

    t.is(searchType, "reverse")
    t.is(query.get("url"), expected)
  }
)
