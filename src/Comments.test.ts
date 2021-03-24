import test from "ava"

import createNoopLink from "./__helper__/createNoopLink.js"

import {Link} from "./util/link.js"
import {Comments} from "./Comments.js"

test("Creates a link with path to /api/v1/json/comments", async t => {
  const link = createNoopLink<[[string]]>()

  await new Comments({link: link as any as Link})

  const [[path]] = link.firstCall.args

  t.deepEqual(path, "comments")
})
