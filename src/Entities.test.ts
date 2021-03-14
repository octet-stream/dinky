import anyTest, {TestInterface} from "ava"

import {
  createNoopLink,
  CreateNoopLinkContext
} from "./__helper__/createNoopLink"

import {Link} from "./util/link"
import {Entities} from "./Entities"

const test = anyTest as TestInterface<CreateNoopLinkContext>

test.beforeEach(createNoopLink)

class MyEntity extends Entities<any, any> { }

test("Creates a link request that points to given path", async t => {
  const {noopLink: link} = t.context

  const expected = "my-entity"

  await new MyEntity({link: link as any as Link, path: expected})

  const [[actual]] = link.firstCall.args as [[string]]

  t.is(actual, expected)
})

test(".getById() creates a request to entity's ID", async t => {
  const {noopLink: link} = t.context

  const expected = "0"

  await new MyEntity({link: link as any as Link, path: "my-entity"}).getById(0)

  const [[, actual]] = link.firstCall.args as [[unknown, string]]

  t.is(actual, expected)
})
