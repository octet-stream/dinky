import test from "ava"

import createNoopLink from "./__helper__/createNoopLink"

import {Link} from "./util/link"
import {Entities} from "./Entities"

class MyEntity extends Entities<unknown, unknown> { }

test("Creates a link request that points to given path", async t => {
  const link = createNoopLink<[[string]]>()

  const expected = "my-entity"

  await new MyEntity({link: link as any as Link, path: expected})

  const [[actual]] = link.firstCall.args

  t.is(actual, expected)
})

test(".getById() creates a request to entity's ID", async t => {
  const link = createNoopLink<[[unknown, string]]>()

  const expected = "0"

  await new MyEntity({link: link as any as Link, path: "my-entity"}).getById(0)

  const [[, actual]] = link.firstCall.args

  t.is(actual, expected)
})
