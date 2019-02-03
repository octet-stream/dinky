const test = require("ava")

const {spy} = require("sinon")

const createNoopLink = require("../helper/createNoopLink")

const Request = require("../../lib/Request")

test.beforeEach(createNoopLink)

test("Request calls the link on given path", async t => {
  const link = t.context.noopLink

  await new Request({link, path: "search"}).exec()

  const [path] = link.firstCall.args

  t.deepEqual(path, ["search"])
})

test(".ascending() sets images ordering to \"a\"", async t => {
  const link = t.context.noopLink

  // The Request class is thenable so we can avoid of
  // explicit .exec() method calls
  await new Request({link}).ascending()

  const [, query] = link.firstCall.args

  t.true(query.has("order"))
  t.is(query.get("order"), "a")
})

test(".descending() sets images ordering to \"d\"", async t => {
  const link = t.context.noopLink

  await new Request({link}).descending()

  const [, query] = link.firstCall.args

  t.true(query.has("order"))
  t.is(query.get("order"), "d")
})

test(".page() sets the page offset in query", async t => {
  const link = t.context.noopLink

  await new Request({link}).page(42)

  const [, query] = link.firstCall.args

  t.true(query.has("page"))
  t.is(query.get("page"), 42)
})

test(".page() sets default page offset in query", async t => {
  const link = t.context.noopLink

  await new Request({link}).page()

  const [, query] = link.firstCall.args

  t.true(query.has("page"))
  t.is(query.get("page"), 1)
})

test(".catch() correctly handles errors", async t => {
  const link = () => Promise.reject(new Error("Some error."))
  const onRejected = spy()

  await new Request({link}).catch(onRejected)

  t.true(onRejected.called)

  const [err] = onRejected.firstCall.args

  t.is(err.message, "Some error.")
})
