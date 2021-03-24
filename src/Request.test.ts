import test from "ava"

import sinon from "sinon"

import createNoopLink from "./__helper__/createNoopLink"

import Query from "./util/Query"

import {Link} from "./util/link"
import {Request} from "./Request"

const {spy} = sinon

test("Request calls the link on given path", async t => {
  const link = createNoopLink<[[string]]>()

  await new Request({link: link as any as Link, path: "search"}).exec()

  const [[path]] = link.firstCall.args as [[string]]

  t.deepEqual(path, "search")
})

test(".page() sets the page offset in query", async t => {
  const link = createNoopLink<[unknown, Query]>()

  await new Request({link: link as any as Link, path: []}).page(42)

  const [, query] = link.firstCall.args

  t.true(query.has("page"))
  t.is(query.get("page") as number, 42)
})

test(".page() sets default page offset in query", async t => {
  const link = createNoopLink<[unknown, Query]>()

  await new Request({link: link as any as Link, path: []}).page()

  const [, query] = link.firstCall.args

  t.true(query.has("page"))
  t.is(query.get("page") as number, 1)
})

test(".exec() takes per-request options", async t => {
  const expected = {key: "secret", filter: 100073}

  const link = createNoopLink<[string, string, typeof expected]>()

  await new Request({link: link as any as Link, path: []}).exec(expected)

  const [, , actual] = link.firstCall.args

  t.deepEqual(actual, expected)
})

test(".catch() correctly handles errors", async t => {
  const link = () => Promise.reject(new Error("Some error."))
  const onRejected = spy()

  await new Request({link: link as any as Link, path: []}).catch(onRejected)

  t.true(onRejected.called)

  const [err] = onRejected.firstCall.args as [Error]

  t.is(err.message, "Some error.")
})
