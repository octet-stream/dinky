import test from "ava"

import {createNoopLink} from "./__helper__/createNoopLink"

import {Link} from "./util/link"
import {Comments} from "./Comments"

test("Creates a new request to /api/v1/json/comments", async t => {
  const link = createNoopLink<[[string]]>()

  await new Comments({link: link as any as Link})

  const [[path]] = link.firstCall.args

  t.is(path, "comments")
})
