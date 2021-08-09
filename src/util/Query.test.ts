import test from "ava"

import Query from "./Query"

test(".set() allows only string keys", t => {
  const query = new Query()

  // @ts-ignore
  const trap = () => query.set({}, "some value")

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(err.message, "Given key must be a string.")
})

test(".get() allows only string keys", t => {
  const query = new Query()

  // @ts-ignore
  const trap = () => query.get({})

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(err.message, "Given key must be a string.")
})

test(".get() returns a value by its key", t => {
  const query = new Query()

  query.set("key", "value")

  t.is(query.get("key"), "value")
})

test(".has() allows only string keys", t => {
  const query = new Query()

  // @ts-ignore
  const trap = () => query.has({})

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(err.message, "Given key must be a string.")
})

test(".has() returns true for known keys and false for unknown", t => {
  const query = new Query()

  query.set("key", "value")

  t.true(query.has("key"))
  t.false(query.has("unknown"))
})

test(".delete() allows only string keys", t => {
  const query = new Query()

  // @ts-ignore
  const trap = () => query.delete({})

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(err.message, "Given key must be a string.")
})

test(".delete() removes value by its key", t => {
  const query = new Query()

  query.set("key", "value")

  t.true(query.has("key"))

  query.delete("key")

  t.false(query.has("key"))
})

test(".toString() returns a correctly build query string", t => {
  const query = new Query()

  const expected = "q=princess+luna&random_image=true"

  query.set("q", "princess luna")
  query.set("random_image", true)

  t.is(query.toString(), expected)
})

test(".toString() ignores nullish values", t => {
  const query = new Query()

  const expected = "another_key=value"

  query.set("key", null)
  query.set("another_key", "value")

  t.is(query.toString(), expected)
})

test(
  ".[Symbol.toStringTag]() returns the same result as .toString()",
  t => {
    const query = new Query()

    const expected = "q=princess+luna&random_image=true"

    query.set("q", "princess luna")
    query.set("random_image", true)

    t.is(query[Symbol.toStringTag], expected)
  }
)
