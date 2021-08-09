import test from "ava"

import cast from "./castDates.js"

test("Casts dates from the list", t => {
  const date = new Date()
  const isoString = date.toISOString()

  const expected = {
    createdAt: date,
    firstSeenAt: date,
    updatedAt: date,
    lastRepliedToAt: date,
    avardedAt: date,
    editedAt: date,
  }

  t.deepEqual(cast({
    createdAt: isoString,
    firstSeenAt: isoString,
    updatedAt: isoString,
    lastRepliedToAt: isoString,
    avardedAt: isoString,
    editedAt: isoString,
  }), expected)
})

test("Keeps inappropriate dates as is", t => {
  const date = new Date("some invalid date")

  const expected = {
    createdAt: date,
    firstSeenAt: date,
    updatedAt: date,
    lastRepliedToAt: date,
    avardedAt: date,
    editedAt: date,
  }

  t.deepEqual(cast(expected), expected)
})

test("Ignores fields that aren't mentioned in the list", t => {
  const date = new Date()

  const expected = {
    someDate: date,
    string: "Some string."
  }

  t.deepEqual(cast(expected), expected)
})
