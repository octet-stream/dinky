import test from "ava"

import {createNoopLink} from "../__helper__/createNoopLink.js"

import {Tags, tags} from "./Tags.js"

test("Creates a new request to /api/v1/json/tags", async t => {
  const link = createNoopLink()

  await new Tags({link})

  const [[path]] = link.firstCall.args

  t.is(path, "tags")
})

test("Can be instaniated using tags function", t => {
  t.true(tags() instanceof Tags)
})
