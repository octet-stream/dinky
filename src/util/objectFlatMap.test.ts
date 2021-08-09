import test from "ava"

import sinon from "sinon"

import map from "./objectFlatMap.js"

const {keys} = Object
const {spy} = sinon

const noop = (value: unknown) => value

test("Exectues given function for each field", t => {
  const object = {
    key: "value",
    anotherKey: "another value",
    third: "aonther call must be recorded"
  }

  const fn = spy(noop)

  map(object, fn)

  t.is(fn.callCount, keys(object).length)
})

test("Iterates through the deep object", t => {
  const object = {
    name: "John Doe",
    dob: {
      day: 7,
      month: "March",
      year: 1989
    }
  }

  const fn = spy(noop)
  const actual = map(object, fn)

  t.deepEqual(actual, object)
  t.is(fn.callCount, keys(object).length + keys(object.dob).length - 1)
})

test("Sets a field's value to result of given function", t => {
  const object = {
    key: "foo"
  }

  const expected = "bar"

  const fn = () => expected

  const actual = map(object, fn) as typeof object

  t.is(actual.key, expected)
})
