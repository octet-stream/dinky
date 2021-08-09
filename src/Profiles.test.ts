import test from "ava"

import {createNoopLink} from "./__helper__/createNoopLink"

import {Profiles} from "./Profiles"

test("Creates a new request to /api/v1/json/profiles", async t => {
  const link = createNoopLink()

  await new Profiles({link})

  const [[path]] = link.firstCall.args

  t.is(path, "profiles")
})
