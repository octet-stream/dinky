import anyTest, {TestInterface} from "ava"

import {
  createNoopLink,
  CreateNoopLinkContext
} from "./__helper__/createNoopLink"

import {Link} from "./util/link"
import {Tags} from "./Tags"

const test = anyTest as TestInterface<CreateNoopLinkContext>

test.beforeEach(createNoopLink)

test("Creates a link with path to /api/v1/json/tags", async t => {
  const link = t.context.noopLink

  await new Tags({link: link as any as Link})

  const [[path]] = link.firstCall.args as [[string]]

  t.deepEqual(path, "tags")
})
