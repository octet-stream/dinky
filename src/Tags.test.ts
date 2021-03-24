import test from "ava"

import createNoopLink from "./__helper__/createNoopLink"

import {Link} from "./util/link"
import {Tags} from "./Tags"

test("Creates a link with path to /api/v1/json/tags", async t => {
  const link = createNoopLink<[[string]]>()

  await new Tags({link: link as any as Link})

  const [[path]] = link.firstCall.args

  t.deepEqual(path, "tags")
})
