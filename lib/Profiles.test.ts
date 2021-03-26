import test from "ava"

import createNoopLink from "./__helper__/createNoopLink"

import {Link} from "./util/link"
import {Profiles} from "./Profiles"

test("Creates a new request to /api/v1/json/profiles", async t => {
  const link = createNoopLink<[[string]]>()

  await new Profiles({link: link as any as Link})

  const [[path]] = link.firstCall.args as [[string]]

  t.is(path, "profiles")
})
