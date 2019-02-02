const test = require("ava")
// const mock = require("fetch-mock")

const {spy} = require("sinon")

const Request = require("../../lib/Request")

test("Calls the link on given path", async t => {
  const link = spy(() => Promise.resolve({}))

  await new Request({link, path: "search"}).exec()

  const [path] = link.firstCall.args

  t.is(path, "search")
})

test("Request#ascending sets images ordering to \"a\"", async t => {
  const link = spy(() => Promise.resolve({}))

  // The Request class is thenable so we can avoid of
  // explicit .exec() method calls
  await new Request({link, path: "search"}).ascending()

  const [, query] = link.firstCall.args

  t.true(query.has("order"))
  t.is(query.get("order"), "a")
})

test("Request#descending sets images ordering to \"d\"", async t => {
  const link = spy(() => Promise.resolve({}))

  await new Request({link, path: "search"}).descending()

  const [, query] = link.firstCall.args

  t.true(query.has("order"))
  t.is(query.get("order"), "d")
})

test("Request#page sets the page offset in query", async t => {
  const link = spy(() => Promise.resolve({}))

  await new Request({link, path: "search"}).page(42)

  const [, query] = link.firstCall.args

  t.true(query.has("page"))
  t.is(query.get("page"), 42)
})
