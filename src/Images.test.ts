import test from "ava"

import createNoopLink from "./__helper__/createNoopLink"

import {Link} from "./util/link"
import {Images} from "./Images"

test("Creates a new request to /api/v1/json/images", async t => {
  const link = createNoopLink<[[string]]>()

  await new Images({link: link as any as Link})

  const [[path]] = link.firstCall.args

  t.deepEqual(path, "images")
})

test("Creates a new request to /api/v1/json/images/featured", async t => {
  const link = createNoopLink<[[unknown, string]]>()

  await new Images({link: link as any as Link}).featured()

  const [[, actual]] = link.firstCall.args

  t.is(actual, "featured")
})
