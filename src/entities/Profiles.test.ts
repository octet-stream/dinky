import test from "ava"

import {createNoopLink} from "../__helper__/createNoopLink.js"

import {Profiles, profiles} from "./Profiles.js"

test("Creates a new request to /api/v1/json/profiles", async t => {
  const link = createNoopLink()

  await new Profiles({link})

  const [[path]] = link.firstCall.args

  t.is(path, "profiles")
})

test("Can be instaniated using profiles function", t => {
  t.true(profiles() instanceof Profiles)
})
