import test from "ava"

import {createNoopLink} from "./__helper__/createNoopLink.js"

import {Filters} from "./Filters.js"

test("Creates a request to /api/v1/json/filters", async t => {
  const link = createNoopLink()

  await new Filters({link})

  const [[actual]] = link.firstCall.args

  t.is(actual, "filters")
})

test("Creates a proper request for system filters", async t => {
  const link = createNoopLink()

  await new Filters({link}).system()

  const [[, actual]] = link.firstCall.args

  t.is(actual, "system")
})

test("Creates a proper request for user filters", async t => {
  const link = createNoopLink()

  await new Filters({link}).user()

  const [[, actual]] = link.firstCall.args

  t.is(actual, "user")
})
