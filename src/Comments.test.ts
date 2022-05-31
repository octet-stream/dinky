import test from "ava"

import {createNoopLink} from "./__helper__/createNoopLink.js"

import {Comments, comments} from "./Comments.js"

test("Creates a new request to /api/v1/json/comments", async t => {
  const link = createNoopLink()

  await new Comments({link})

  const [[path]] = link.firstCall.args

  t.is(path, "comments")
})

test("Can be instaniated using comments function", t => {
  t.true(comments() instanceof Comments)
})
