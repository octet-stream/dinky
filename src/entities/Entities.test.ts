import test from "ava"

import {createNoopLink} from "../__helper__/createNoopLink.js"
import {Entities} from "./Entities.js"

class MyEntity extends Entities<unknown, unknown> { }

test("Creates a link request that points to given path", async t => {
  const link = createNoopLink()

  const expected = "my-entity"

  await new MyEntity({link, path: expected})

  const [[actual]] = link.firstCall.args

  t.is(actual, expected)
})

test(".getById() creates a request to entity's ID", async t => {
  const link = createNoopLink()

  const expected = "0"

  await new MyEntity({link, path: "my-entity"}).getById(0)

  const [[, actual]] = link.firstCall.args

  t.is(actual, expected)
})
