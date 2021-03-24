import test from "ava"

import createNoopLink from "./__helper__/createNoopLink.js"

import {Link} from "./util/link.js"
import {Images} from "./Images.js"

test("Creates a link with path to /api/v1/json/images", async t => {
  const link = createNoopLink<[[string]]>()

  await new Images({link: link as any as Link})

  const [[path]] = link.firstCall.args

  t.deepEqual(path, "images")
})

test("Creates a link that points to /api/v1/json/images/featured", async t => {
  const link = createNoopLink<[[unknown, string]]>()

  await new Images({link: link as any as Link}).featured()

  const [[, actual]] = link.firstCall.args

  t.is(actual, "featured")
})
