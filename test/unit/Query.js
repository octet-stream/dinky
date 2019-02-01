const test = require("ava")

const Query = require("../../lib/Query")

test("Query#set allows only string keys", t => {
  const query = new Query()

  const trap = () => query.set({}, "some value")

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(err.message, "Given key must be a string.")
})

test("Query#get allows only string keys", t => {
  const query = new Query()

  const trap = () => query.get({}, "some value")

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(err.message, "Given key must be a string.")
})

test("Query#get returns a value by its key", t => {
  const query = new Query()

  query.set("key", "value")

  t.is(query.get("key"), "value")
})

test("Query#has allows only string keys", t => {
  const query = new Query()

  const trap = () => query.has({}, "some value")

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(err.message, "Given key must be a string.")
})

test("Query#has returns true for known keys and false for unknown", t => {
  const query = new Query()

  query.set("key", "value")

  t.true(query.has("key"))
  t.false(query.has("unknown"))
})

test("Query#delete allows only string keys", t => {
  const query = new Query()

  const trap = () => query.delete({}, "some value")

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(err.message, "Given key must be a string.")
})

test("Query#delete removes value by its key", t => {
  const query = new Query()

  query.set("key", "value")

  t.true(query.has("key"))

  query.delete("key")

  t.false(query.has("key"))
})

test("Query#toString() returns a correctly build query string", t => {
  const query = new Query()

  const expected = "q=princess+luna&random_image=true"

  query.set("q", "princess luna")
  query.set("random_image", true)

  t.is(query.toString(), expected)
})

test("Query#toString() ignores nullish values", t => {
  const query = new Query()

  const expected = "another_key=value"

  query.set("key", null)
  query.set("another_key", "value")

  t.is(query.toString(), expected)
})

test(
  "Query#[Symbol.toStringTag] returns the same result as Query#toString()",
  t => {
    const query = new Query()

    const expected = "q=princess+luna&random_image=true"

    query.set("q", "princess luna")
    query.set("random_image", true)

    t.is(query[Symbol.toStringTag], expected)
  }
)
