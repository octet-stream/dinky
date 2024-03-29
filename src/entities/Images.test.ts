import test from "ava"

import {createNoopLink} from "../__helper__/createNoopLink.js"

import {Images, images} from "./Images.js"

test("Creates a new request to /api/v1/json/images", async t => {
  const link = createNoopLink()

  await new Images({link})

  const [[path]] = link.firstCall.args

  t.is(path, "images")
})

test("Creates a new request to /api/v1/json/images/featured", async t => {
  const link = createNoopLink()

  await new Images({link}).featured()

  const [[, actual]] = link.firstCall.args

  t.is(actual, "featured")
})

test("Can be instaniated using images function", t => {
  t.true(images() instanceof Images)
})
