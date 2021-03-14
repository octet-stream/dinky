import anyTest, {TestInterface} from "ava"

import {
  createNoopLink,
  CreateNoopLinkContext
} from "./__helper__/createNoopLink"

import {Link} from "./util/link"
import {Images} from "./Images"

const test = anyTest as TestInterface<CreateNoopLinkContext>

test.beforeEach(createNoopLink)

test("Creates a link with path to /api/v1/json/images", async t => {
  const {noopLink: link} = t.context

  await new Images({link: link as any as Link})

  const [[path]] = link.firstCall.args as [[string]]

  t.deepEqual(path, "images")
})

test("Creates a link that points to /api/v1/json/images/featured", async t => {
  const {noopLink: link} = t.context

  await new Images({link: link as any as Link}).featured()

  const [[, actual]] = link.firstCall.args as [[unknown, string]]

  t.is(actual, "featured")
})
