import anyTest, {TestInterface} from "ava"

import {
  createNoopLink,
  CreateNoopLinkContext
} from "./__helper__/createNoopLink"

import {Link} from "./util/link"
import {Comments} from "./Comments"

const test = anyTest as TestInterface<CreateNoopLinkContext>

test.beforeEach(createNoopLink)

test("Creates a link with path to /api/v1/json/comments", async t => {
  const link = t.context.noopLink

  await new Comments({link: link as any as Link})

  const [path] = link.firstCall.args

  t.deepEqual(path, ["comments"])
})
