import test from "ava"

import createNoopLink from "./__helper__/createNoopLink.js"

import {Link} from "./util/link.js"
import {User} from "./User.js"

test("Creates a link with path to /api/v1/json/profiles", async t => {
  const link = createNoopLink<[[string]]>()

  await new User({link: link as any as Link})

  const [[path]] = link.firstCall.args as [[string]]

  t.deepEqual(path, "profiles")
})
