import anyTest, {TestInterface} from "ava"

import {
  createNoopLink,
  CreateNoopLinkContext
} from "./__helper__/createNoopLink"

import {Link} from "./util/link"
import {User} from "./User"

const test = anyTest as TestInterface<CreateNoopLinkContext>

test.beforeEach(createNoopLink)

test("Creates a link with path to /api/v1/json/profiles", async t => {
  const {noopLink: link} = t.context

  await new User({link: link as any as Link})

  const [[path]] = link.firstCall.args as [[string]]

  t.deepEqual(path, "profiles")
})
